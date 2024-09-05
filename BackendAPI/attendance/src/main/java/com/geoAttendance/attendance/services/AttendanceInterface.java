package com.geoAttendance.attendance.services;

import com.geoAttendance.attendance.model.Attendance;

public interface AttendanceInterface {
    Attendance checkIn(String employeeId, Double latitude, Double longitude, String locationDescription);
    Attendance checkOut(String employeeId, Double latitude, Double longitude);
}
