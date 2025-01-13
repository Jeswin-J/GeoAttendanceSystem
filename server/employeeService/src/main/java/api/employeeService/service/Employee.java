package api.employeeService.service;

import api.employeeService.dto.CreateRequest;
import api.employeeService.model.EmployeeEntity;

import java.util.List;

public interface Employee {

    List<EmployeeEntity> getAllEmployees();

    EmployeeEntity getEmployeeById(String employeeId);

    boolean doesEmployeeExist(String employeeId);

    EmployeeEntity addNewEmployee(CreateRequest request);

    boolean deleteEmployeeById(String employeeId);
}
