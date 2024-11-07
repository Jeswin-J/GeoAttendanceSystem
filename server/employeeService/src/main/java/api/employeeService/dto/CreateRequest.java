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

    private String personalEmail;

    private String phoneNumber;

    private Designation designation;

    private Department department;

    private Status status;

    private LocalDate dateOfJoining;

    private WorkType employeeType;

    private String profilePictureUrl;


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public String getPersonalEmail() {
        return personalEmail;
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

    public Status getStatus() {
        return status;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public WorkType getEmployeeType() {
        return employeeType;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public String getEmployeeId() {
        return employeeId;
    }
}
