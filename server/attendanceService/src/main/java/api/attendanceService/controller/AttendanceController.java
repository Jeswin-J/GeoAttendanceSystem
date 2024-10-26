package api.attendanceService.controller;

import api.attendanceService.dto.AttendanceRequest;
import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.service.Attendance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/attendance/")
public class AttendanceController {

    @Autowired
    private Attendance attendanceService;

    private static final Logger logger = LoggerFactory.getLogger(AttendanceController.class);


    /**
     * Records the check-in time and geolocation for the employee.
     */
    @PostMapping("/checkIn")
    public ResponseEntity<String> checkIn(@RequestBody AttendanceRequest attendanceRequest){

        boolean success = attendanceService.markCheckIn(attendanceRequest);

        if(success){
            return ResponseEntity.ok("Check-In Success for: " + attendanceRequest.getEmployeeId());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Check-In Failed for: " + attendanceRequest.getEmployeeId());
    }

    /**
     * Records the check-in time and geolocation for the employee.
     */
    @PostMapping("/checkOut")
    public ResponseEntity<String> checkOut(@RequestBody AttendanceRequest attendanceRequest){

        boolean success = attendanceService.markCheckOut(attendanceRequest);

        if(success){
            return ResponseEntity.ok("Check-Out Success for: " + attendanceRequest.getEmployeeId());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Check-Out Failed for: " + attendanceRequest.getEmployeeId());
    }


    /**
     * Retrieves the current check-in status of the specified employee (e.g., checked in or not).
     */
    @GetMapping("/status/{employeeId}")
    public ResponseEntity<AttendanceEntity> getStatus(@PathVariable String employeeId){

        AttendanceEntity attendanceEntity = attendanceService.getLastAttendanceRecord(employeeId);

        if (attendanceEntity != null) {
            return ResponseEntity.ok(attendanceEntity);
        }

        return ResponseEntity.notFound().build();
    }


    /**
     * Retrieves a list of all users who checked in today.
     */
    @GetMapping("/today")
    public ResponseEntity<List<AttendanceEntity>> getTodayCheckIns(){

        return ResponseEntity.ok(null);
    }


    /**
     * Fetches the full check-in history for a specific user.
     */
    @PostMapping("/history/{checkInId}")
    public ResponseEntity<List<AttendanceEntity>> getHistory(@RequestBody Long checkInId){

        return ResponseEntity.ok(null);
    }

}
