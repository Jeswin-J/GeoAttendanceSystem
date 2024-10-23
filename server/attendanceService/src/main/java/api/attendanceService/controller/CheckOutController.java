package api.attendanceService.controller;

import api.attendanceService.model.Attendance;
import api.attendanceService.service.CheckOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/checkOut/")
public class CheckOutController {

    @Autowired
    private CheckOut checkOut;

    /**
     * Records the check-out time and geolocation for the employee.
     */
    @PostMapping("/")
    public ResponseEntity<Attendance> checkOut(@RequestBody String employeeId){

        return ResponseEntity.ok(null);
    }

    /**
     * Retrieves a list of all users who checked out today.
     */
    @GetMapping("/today")
    public ResponseEntity<List<Attendance>> getTodayCheckOuts(){

        return ResponseEntity.ok(null);
    }


}
