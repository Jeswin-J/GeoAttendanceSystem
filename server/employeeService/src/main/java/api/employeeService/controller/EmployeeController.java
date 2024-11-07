package api.employeeService.controller;

import api.employeeService.dto.CreateRequest;
import api.employeeService.dto.Response;
import api.employeeService.service.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/emp")
public class EmployeeController {

    @Autowired
    Employee employee;

    @PostMapping("/new")
    public ResponseEntity<Response> createNewEmployee(@RequestBody CreateRequest request){
        Response response = employee.addNewEmployee(request);
        return ResponseEntity.status(response.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(response);
    }

    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable String employeeId){
        Response response = employee.deleteEmployeeById(employeeId);
        return ResponseEntity.status(response.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(response);
    }
}
