package api.attendanceService.service;

import api.attendanceService.builder.AttendanceBuilder;
import api.attendanceService.builder.LocationBuilder;
import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.enums.LocationType;
import api.attendanceService.enums.Status;
import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.model.EmployeeEntity;
import api.attendanceService.model.LocationEntity;
import api.attendanceService.repository.AttendanceRepository;
import api.attendanceService.repository.EmployeeRepository;
import api.attendanceService.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public boolean markCheckIn(AttendanceRequest attendanceRequest) {
        EmployeeEntity employee = employeeRepository.findEmployeeByEmployeeId(attendanceRequest.getEmployeeId());

        if (employee == null) {
            return false;
        }

        if (attendanceRequest.getLocation() == null) {
            return false;
        }

        AttendanceEntity lastAttendanceRecord = getLastAttendanceRecord(employee.getEmployeeId());

        if (lastAttendanceRecord != null && lastAttendanceRecord.getCheckOutTimeStamp() == null) {
            return false;
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
        return true;
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
