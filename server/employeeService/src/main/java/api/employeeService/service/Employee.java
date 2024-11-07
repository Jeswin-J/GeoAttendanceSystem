package api.employeeService.service;

import api.employeeService.dto.CreateRequest;
import api.employeeService.dto.Response;

public interface Employee {
    Response addNewEmployee(CreateRequest request);

    Response deleteEmployeeById(String employeeId);
}
