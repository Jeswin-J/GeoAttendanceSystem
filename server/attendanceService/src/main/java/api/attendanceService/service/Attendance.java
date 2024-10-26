package api.attendanceService.service;

import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.dto.AttendanceResponse;
import api.attendanceService.model.AttendanceEntity;
import org.springframework.stereotype.Service;

@Service
public interface Attendance {
    AttendanceResponse markCheckIn(AttendanceRequest attendanceRequest);

    AttendanceResponse markCheckOut(AttendanceRequest attendanceRequest);

    AttendanceEntity getLastAttendanceRecord(String employeeId);



}
