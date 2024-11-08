package api.employeeService.service;

import api.employeeService.dto.CreateRequest;
import api.employeeService.dto.Response;
import api.employeeService.model.EmployeeEntity;
import api.employeeService.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements Employee{

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Response addNewEmployee(CreateRequest request) {

        Optional<EmployeeEntity> existingEmployeeByEmail = employeeRepository.findByWorkEmail(request.getWorkEmail());
        if (existingEmployeeByEmail.isPresent()) {
            return new Response().setSuccess(false).setMessage("An employee with this work email already exists.");
        }

        EmployeeEntity newEmployee = new EmployeeEntity()
                .setEmployeeId(request.getEmployeeId())
                .setEmployeeType(request.getEmployeeType())
                .setDateOfJoining(request.getDateOfJoining())
                .setDepartment(request.getDepartment())
                .setDesignation(request.getDesignation())
                .setFirstName(request.getFirstName())
                .setLastName(request.getLastName())
                .setPhoneNumber(request.getPhoneNumber())
                .setWorkEmail(request.getWorkEmail())
                .setPersonalEmail(request.getPersonalEmail())
                .setProfilePictureUrl(request.getProfilePictureUrl())
                .setStatus(request.getStatus());



        try {
            employeeRepository.save(newEmployee);
        } catch (Exception e) {
            return new Response()
                    .setSuccess(false)
                    .setMessage("An error occurred while adding the employee: " + e.getMessage());
        }

        return new Response()
                .setSuccess(true)
                .setMessage("Employee added successfully!")
                .setData(newEmployee);
    }

    @Override
    public Response deleteEmployeeById(String employeeId) {
        Optional<EmployeeEntity> employeeOpt = employeeRepository.findByEmployeeId(employeeId);

        if (employeeOpt.isPresent()) {
            employeeRepository.delete(employeeOpt.get());
            return new Response()
                    .setMessage("Employee with ID " + employeeId + " has been successfully deleted.")
                    .setSuccess(true);
        } else {
            return new Response()
                    .setMessage("Employee with ID " + employeeId + " not found.")
                    .setSuccess(false);
        }
    }

    @Override
    public Response getAllEmployees() {
        List<EmployeeEntity> employees = employeeRepository.findAll();

        if(employees.isEmpty()){
            return new Response()
                    .setMessage("No Employees found in Database")
                    .setSuccess(false);
        }

        return new Response()
                .setMessage( employees.size() + " Employees found!")
                .setSuccess(true)
                .setData(employees);
    }

}
