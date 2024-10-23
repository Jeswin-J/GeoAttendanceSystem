package api.attendanceService.service;

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

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setCheckInTimeStamp(checkInRequest.getCheckInTimestamp());


        Location location = new Location();
        location.setTimestamp(checkInRequest.getCheckInTimestamp());
        location.setLatitude(checkInRequest.getLocation().getLatitude());
        location.setLongitude(checkInRequest.getLocation().getLongitude());
        location.setAccuracy(checkInRequest.getLocation().getAccuracy());


        attendance.setCheckInLocation(location);
        attendance.setAttendanceStatus(Status.PRESENT);

        attendanceRepository.save(attendance);
        return true;
    }
}
