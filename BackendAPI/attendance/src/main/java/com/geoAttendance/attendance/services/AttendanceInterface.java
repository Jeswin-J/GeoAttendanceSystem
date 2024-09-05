package com.geoAttendance.attendance.services;

import com.geoAttendance.attendance.model.Attendance;

public interface AttendanceInterface {
    Attendance checkIn(Long employeeId, Double latitude, Double longitude, String locationDescription);
    Attendance checkOut(Long employeeId, Double latitude, Double longitude);
}
