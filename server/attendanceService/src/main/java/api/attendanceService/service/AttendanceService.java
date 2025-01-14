package api.attendanceService.service;

import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.dto.AttendanceResponse;
import api.attendanceService.model.Coordinate;
import api.attendanceService.enums.Status;
import api.attendanceService.feign.EmployeeService;
import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.repository.AttendanceRepository;
import api.attendanceService.utils.AttendanceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
public class AttendanceService implements Attendance {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    EmployeeService employeeService;

    @Override
    @Transactional
    public AttendanceResponse markCheckIn(AttendanceRequest attendanceRequest) {
        Boolean response = employeeService.employeeExists(attendanceRequest.getEmployeeId()).getBody();

        if (Boolean.FALSE.equals(response)) {
            return null;
        }

        AttendanceEntity lastAttendanceRecord = getLastAttendanceRecord(attendanceRequest.getEmployeeId());

        if (lastAttendanceRecord != null && lastAttendanceRecord.getCheckOutTimeStamp() == null) {
            return null;
        }

        AttendanceEntity attendanceEntity = new AttendanceEntity()
                .setEmployeeId(attendanceRequest.getEmployeeId())
                .setAttendanceStatus(Status.PRESENT)
                .setCheckInLocation(new Coordinate(attendanceRequest.getLatitude(), attendanceRequest.getLongitude()));

        attendanceRepository.save(attendanceEntity);

        return new AttendanceResponse(
                attendanceEntity.getEmployeeId(),
                attendanceEntity.getCheckInTimeStamp().toString(),
                attendanceEntity.getCheckInLocation().getLatitude(),
                attendanceEntity.getCheckInLocation().getLongitude()
        );
    }

    @Override
    public AttendanceResponse markCheckOut(AttendanceRequest attendanceRequest) {
        Boolean response = employeeService.employeeExists(attendanceRequest.getEmployeeId()).getBody();

        if (Boolean.FALSE.equals(response)) {
            return null;
        }
        AttendanceEntity attendanceRecord = getLastAttendanceRecord(attendanceRequest.getEmployeeId());

        if (attendanceRecord == null) {
            return null;
        }

        attendanceRecord.setCheckOutLocation(
                new Coordinate(
                        attendanceRequest.getLatitude(),
                        attendanceRequest.getLongitude()
                )
        );

        Timestamp now = new Timestamp(System.currentTimeMillis());
        attendanceRecord.setCheckOutTimeStamp(now);
        attendanceRecord.setWorkingHours(AttendanceUtils.calculateWorkHours(attendanceRecord.getCheckInTimeStamp(), now));

        attendanceRepository.save(attendanceRecord);

        return new AttendanceResponse(
                attendanceRecord.getEmployeeId(),
                attendanceRecord.getCheckOutTimeStamp().toString(),
                attendanceRecord.getCheckOutLocation().getLatitude(),
                attendanceRecord.getCheckOutLocation().getLongitude()
        );
    }


    @Override
    public AttendanceEntity getLastAttendanceRecord(String employeeId) {

        Boolean response = employeeService.employeeExists(employeeId).getBody();

        if (Boolean.FALSE.equals(response)) {
            return null;
        }

        return attendanceRepository.findTopByEmployeeIdOrderByCheckInTimeStampDesc(employeeId);
    }

}
