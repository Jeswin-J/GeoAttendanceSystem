package api.attendanceService.service;

import api.attendanceService.builder.AttendanceBuilder;
import api.attendanceService.builder.LocationBuilder;
import api.attendanceService.dto.CheckInRequest;
import api.attendanceService.enums.Status;
import api.attendanceService.model.Attendance;
import api.attendanceService.model.Employee;
import api.attendanceService.model.Location;
import api.attendanceService.repository.AttendanceRepository;
import api.attendanceService.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CheckInService implements CheckIn{

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public boolean markCheckIn(CheckInRequest checkInRequest) {
        Employee employee = employeeRepository.findEmployeeById(checkInRequest.getEmployeeId());

        if (employee == null) {
            return false;
        }

        Location location = new LocationBuilder()
                .withLatitude(checkInRequest.getLocation().getLatitude())
                .withLongitude(checkInRequest.getLocation().getLongitude())
                .withAccuracy(checkInRequest.getLocation().getAccuracy())
                .build();

        Attendance attendance = new AttendanceBuilder()
                .withEmployee(employee)
                .withLocation(location)
                .withStatus(Status.PRESENT)
                .build();

        attendanceRepository.save(attendance);
        return true;
    }

}
