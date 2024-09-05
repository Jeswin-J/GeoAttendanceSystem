package com.geoAttendance.attendance.services;
import com.geoAttendance.attendance.model.Attendance;
import com.geoAttendance.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AttendanceService implements AttendanceInterface{

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public Attendance checkIn(String employeeId, Double latitude, Double longitude, String locationDescription) {
        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setCheckInTime(LocalDateTime.now());
        attendance.setLatitude(latitude);
        attendance.setLongitude(longitude);
        attendance.setLocationDescription(locationDescription);
        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance checkOut(String employeeId, Double latitude, Double longitude) {
        Optional<Attendance> attendanceOptional = attendanceRepository.findAll()
                .stream()
                .filter(att -> att.getEmployeeId().equals(employeeId) && att.getCheckOutTime() == null)
                .findFirst();

        if (attendanceOptional.isPresent()) {
            Attendance attendance = attendanceOptional.get();
            attendance.setCheckOutTime(LocalDateTime.now());
            return attendanceRepository.save(attendance);
        }

        return null; // Or handle this case as needed
    }
}
