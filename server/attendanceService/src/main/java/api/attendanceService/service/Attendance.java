package api.attendanceService.service;

import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.model.AttendanceEntity;
import org.springframework.stereotype.Service;

@Service
public interface Attendance {
    boolean markCheckIn(AttendanceRequest attendanceRequest);

    boolean markCheckOut(AttendanceRequest attendanceRequest);

    AttendanceEntity getLastAttendanceRecord(String employeeId);



}
