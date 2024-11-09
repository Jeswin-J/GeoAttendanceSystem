package api.employeeService.dto;

import api.employeeService.enums.Department;
import api.employeeService.enums.Designation;
import api.employeeService.enums.Status;
import api.employeeService.enums.WorkType;

import java.time.LocalDate;

public class CreateRequest {

    private String employeeId;

    private String firstName;

    private String lastName;

    private String workEmail;

    private String phoneNumber;

    private Designation designation;

    private Department department;

    private LocalDate dateOfJoining;

    private WorkType employeeType;


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Designation getDesignation() {
        return designation;
    }

    public Department getDepartment() {
        return department;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public WorkType getEmployeeType() {
        return employeeType;
    }


    @Override
    public String toString() {
        return "CreateRequest{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", workEmail='" + workEmail + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", designation=" + designation +
                ", department=" + department +
                ", dateOfJoining=" + dateOfJoining +
                ", employeeType=" + employeeType +
                '}';
    }

    public String getEmployeeId() {
        return employeeId;
    }
}
