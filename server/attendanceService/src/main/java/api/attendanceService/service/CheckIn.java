package api.attendanceService.service;

import api.attendanceService.dto.CheckInRequest;
import api.attendanceService.model.Attendance;
import org.springframework.stereotype.Service;

@Service
public interface CheckIn {
    boolean markCheckIn(CheckInRequest checkInRequest);

    Attendance getLastAttendanceRecord(String employeeId);



}
