package com.geoAttendance.attendance.controller;
import com.geoAttendance.attendance.dao.CheckInRequest;
import com.geoAttendance.attendance.dao.CheckOutRequest;
import com.geoAttendance.attendance.model.Attendance;
import com.geoAttendance.attendance.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/hello")
    public String hello(){
        return "HI";
    }

    @PostMapping("/checkin")
    public Attendance checkIn(@RequestBody CheckInRequest checkInRequest) {
        return attendanceService.checkIn(
                checkInRequest.getEmployeeId(),
                checkInRequest.getLatitude(),
                checkInRequest.getLongitude(),
                checkInRequest.getLocationDescription()
        );
    }

    @PostMapping("/checkout")
    public Attendance checkOut(@RequestBody CheckOutRequest request) {
        return attendanceService.checkOut(
                request.getEmployeeId(),
                request.getLatitude(),
                request.getLongitude()
        );
    }

    @GetMapping("/{employeeId}")
    public List<Attendance> attendanceRecord(@PathVariable Long employeeId){
        return null;
    }
}
