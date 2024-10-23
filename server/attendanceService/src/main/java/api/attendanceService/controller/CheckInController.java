package api.attendanceService.controller;

import api.attendanceService.model.Attendance;
import api.attendanceService.service.CheckIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/checkIn/")
public class CheckInController {

    @Autowired
    private CheckIn checkin;


    /**
     * Records the check-in time and geolocation for the employee.
     */
    @PostMapping("/")
    public ResponseEntity<Attendance> checkIn(@RequestBody String employeeId){

        return ResponseEntity.ok(null);
    }


    /**
     * Retrieves the current check-in status of the specified employee (e.g., checked in or not).
     */
    @PostMapping("/status/{employeeId}")
    public ResponseEntity<String> getStatus(@RequestBody String employeeId){

        return ResponseEntity.ok("STATUS");
    }


    /**
     * Retrieves a list of all users who checked in today.
     */
    @GetMapping("/today")
    public ResponseEntity<List<Attendance>> getTodayCheckIns(){

        return ResponseEntity.ok(null);
    }


    /**
     * Fetches the full check-in history for a specific user.
     */
    @PostMapping("/history/{checkInId}")
    public ResponseEntity<List<Attendance>> getHistory(@RequestBody Long checkInId){

        return ResponseEntity.ok(null);
    }

}
