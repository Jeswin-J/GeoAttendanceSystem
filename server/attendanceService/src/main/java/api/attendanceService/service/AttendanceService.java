package api.attendanceService.service;

import api.attendanceService.builder.AttendanceBuilder;
import api.attendanceService.builder.LocationBuilder;
import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.dto.AttendanceResponse;
import api.attendanceService.dto.LocationDTO;
import api.attendanceService.enums.LocationType;
import api.attendanceService.enums.Status;
import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.model.EmployeeEntity;
import api.attendanceService.model.LocationEntity;
import api.attendanceService.repository.AttendanceRepository;
import api.attendanceService.repository.EmployeeRepository;
import api.attendanceService.repository.LocationRepository;
import api.attendanceService.utils.AttendanceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.sql.Timestamp;

@Service
public class AttendanceService implements Attendance {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    LocationRepository locationRepository;

    @Override
    @Transactional
    public AttendanceResponse markCheckIn(AttendanceRequest attendanceRequest) {
        EmployeeEntity employee = employeeRepository.findEmployeeByEmployeeId(attendanceRequest.getEmployeeId());

        if (employee == null || attendanceRequest.getLocation() == null) {
            return null;
        }

        AttendanceEntity lastAttendanceRecord = getLastAttendanceRecord(employee.getEmployeeId());

        if (lastAttendanceRecord != null && lastAttendanceRecord.getCheckOutTimeStamp() == null) {
            return null;
        }

        LocationEntity locationEntity = new LocationBuilder()
                .withEmployee(employee)
                .withLatitude(attendanceRequest.getLocation().getLatitude())
                .withLongitude(attendanceRequest.getLocation().getLongitude())
                .withAccuracy(attendanceRequest.getLocation().getAccuracy())
                .withLocationType(LocationType.CHECK_IN)
                .build();

        locationEntity = locationRepository.save(locationEntity);

        AttendanceEntity attendanceEntity = new AttendanceBuilder()
                .withEmployee(employee)
                .withLocation(locationEntity)
                .withStatus(Status.PRESENT)
                .build();

        attendanceRepository.save(attendanceEntity);

        return new AttendanceResponse(
                employee.getEmployeeId(),
                attendanceEntity.getCheckInTimeStamp().toString(),
                attendanceEntity.getCheckInLocation().getLatitude(),
                attendanceEntity.getCheckInLocation().getLongitude()
        );
    }

    @Override
    public AttendanceResponse markCheckOut(AttendanceRequest attendanceRequest) {
        EmployeeEntity employee = employeeRepository.findEmployeeByEmployeeId(attendanceRequest.getEmployeeId());


        if (employee == null || attendanceRequest.getLocation() == null) {
            return null;
        }

        LocationEntity location = new LocationBuilder()
                .withEmployee(employee)
                .withLatitude(attendanceRequest.getLocation().getLatitude())
                .withLongitude(attendanceRequest.getLocation().getLongitude())
                .withAccuracy(attendanceRequest.getLocation().getAccuracy())
                .withLocationType(LocationType.CHECK_OUT)
                .build();

        location = locationRepository.save(location);

        AttendanceEntity attendanceRecord = getLastAttendanceRecord(employee.getEmployeeId());
        if (attendanceRecord == null) {
            return null;
        }

        attendanceRecord.setCheckOutLocation(location);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        attendanceRecord.setCheckOutTimeStamp(now);
        attendanceRecord.setWorkingHours(AttendanceUtils.calculateWorkHours(attendanceRecord.getCheckInTimeStamp(), now));

        attendanceRepository.save(attendanceRecord);

        return new AttendanceResponse(
                employee.getEmployeeId(),
                attendanceRecord.getCheckOutTimeStamp().toString(),
                attendanceRecord.getCheckOutLocation().getLatitude(),
                attendanceRecord.getCheckOutLocation().getLongitude()
        );
    }



    @Override
    public AttendanceEntity getLastAttendanceRecord(String employeeId) {

        EmployeeEntity employee = employeeRepository.findEmployeeByEmployeeId(employeeId);

        if (employee == null) {
            return null;
        }

        return attendanceRepository.findTopByEmployeeOrderByCheckInTimeStampDesc(employee);
    }

}
