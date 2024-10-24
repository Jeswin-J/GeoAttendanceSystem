package api.attendanceService.service;

import api.attendanceService.builder.AttendanceBuilder;
import api.attendanceService.builder.LocationBuilder;
import api.attendanceService.dto.CheckInRequest;
import api.attendanceService.enums.LocationType;
import api.attendanceService.enums.Status;
import api.attendanceService.model.Attendance;
import api.attendanceService.model.Employee;
import api.attendanceService.model.Location;
import api.attendanceService.repository.AttendanceRepository;
import api.attendanceService.repository.EmployeeRepository;
import api.attendanceService.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class CheckInService implements CheckIn{

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    LocationRepository locationRepository;

    @Override
    @Transactional
    public boolean markCheckIn(CheckInRequest checkInRequest) {
        Employee employee = employeeRepository.findEmployeeByEmployeeId(checkInRequest.getEmployeeId());

        if (employee == null) {
            return false;
        }

        if (checkInRequest.getLocation() == null) {
            return false;
        }

        //TODO: Condition check to avoid multiple check-ins without proper check-out

        Location location = new LocationBuilder()
                .withEmployee(employee)
                .withLatitude(checkInRequest.getLocation().getLatitude())
                .withLongitude(checkInRequest.getLocation().getLongitude())
                .withAccuracy(checkInRequest.getLocation().getAccuracy())
                .withLocationType(LocationType.CHECK_IN)
                .build();

        location = locationRepository.save(location);

        Attendance attendance = new AttendanceBuilder()
                .withEmployee(employee)
                .withLocation(location)
                .withStatus(Status.PRESENT)
                .build();

        attendanceRepository.save(attendance);
        return true;
    }
}
