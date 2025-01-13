package api.employeeService.service;

import api.employeeService.dto.CreateRequest;
import api.employeeService.model.EmployeeEntity;
import api.employeeService.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements Employee {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public EmployeeEntity getEmployeeById(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId).orElse(null);
    }

    @Override
    public boolean doesEmployeeExist(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId).isPresent();
    }

    @Override
    public EmployeeEntity addNewEmployee(CreateRequest request) {
        // Check if employee already exists by email
        Optional<EmployeeEntity> existingEmployeeByEmail = employeeRepository.findByWorkEmail(request.getWorkEmail());
        if (existingEmployeeByEmail.isPresent()) {
            return null;
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
                .setWorkEmail(request.getWorkEmail());

        try {
            return employeeRepository.save(newEmployee);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean deleteEmployeeById(String employeeId) {
        Optional<EmployeeEntity> employeeOpt = employeeRepository.findByEmployeeId(employeeId);
        if (employeeOpt.isPresent()) {
            employeeRepository.delete(employeeOpt.get());
            return true;
        }
        return false;
    }
}
