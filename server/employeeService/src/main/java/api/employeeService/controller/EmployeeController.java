package api.employeeService.controller;

import api.employeeService.dto.CreateRequest;
import api.employeeService.dto.Response;
import api.employeeService.service.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/emp")
public class EmployeeController {

    @Autowired
    Employee employee;

    @PostMapping("/new")
    public ResponseEntity<Response> createNewEmployee(CreateRequest request){
        Response response = employee.addNewEmployee(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
