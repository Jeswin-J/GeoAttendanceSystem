package api.employeeService.controller;

import api.employeeService.dto.CreateRequest;
import api.employeeService.dto.Response;
import api.employeeService.model.EmployeeEntity;
import api.employeeService.service.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/emp")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    Employee employee;

    @GetMapping("")
    public ResponseEntity<Response> allEmployees() {
        List<EmployeeEntity> serviceResponse = employee.getAllEmployees();

        return serviceResponse != null && !serviceResponse.isEmpty() ?
                ResponseEntity.status(HttpStatus.OK).body(new Response(true, serviceResponse)) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(false, "No Employees found in Database"));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<Response> employeeById(@PathVariable String employeeId) {

        EmployeeEntity serviceResponse = employee.getEmployeeById(employeeId);

        if (serviceResponse != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(true, serviceResponse));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(false, "No employee with ID " + employeeId + " found!"));
        }
    }

    @GetMapping("/{employeeId}/exists")
    public ResponseEntity<Boolean> employeeExists(@PathVariable String employeeId) {
        boolean exists = employee.doesEmployeeExist(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(exists);
    }

    @PostMapping("/new")
    public ResponseEntity<Response> createNewEmployee(@RequestBody CreateRequest request) {
        EmployeeEntity serviceResponse = employee.addNewEmployee(request);

        return serviceResponse != null ?
                ResponseEntity.status(HttpStatus.OK).body(new Response(true, serviceResponse)) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(false, "Failed to create new employee"));
    }

    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Response> deleteEmployee(@PathVariable String employeeId) {
        boolean serviceResponse = employee.deleteEmployeeById(employeeId);

        return serviceResponse ?
                ResponseEntity.status(HttpStatus.OK).body(new Response(true, "Employee " + employeeId + " Deleted")) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(false, "Failed to delete employee"));
    }
}
