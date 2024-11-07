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
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public void setWorkEmail(String workEmail) {
//        this.workEmail = workEmail;
//    }
//
//    public void setPersonalEmail(String personalEmail) {
//        this.personalEmail = personalEmail;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public void setDesignation(Designation designation) {
//        this.designation = designation;
//    }
//
//    public void setDepartment(Department department) {
//        this.department = department;
//    }
//
//    public void setStatus(Status status) {
//        this.status = status;
//    }
//
//    public void setDateOfJoining(LocalDate dateOfJoining) {
//        this.dateOfJoining = dateOfJoining;
//    }
//
//    public void setEmployeeType(WorkType employeeType) {
//        this.employeeType = employeeType;
//    }
//
//    public void setProfilePictureUrl(String profilePictureUrl) {
//        this.profilePictureUrl = profilePictureUrl;
//    }

    @Override
    public String toString() {
        return "CreateRequest{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", workEmail='" + workEmail + '\'' +
                ", personalEmail='" + personalEmail + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", designation=" + designation +
                ", department=" + department +
                ", status=" + status +
                ", dateOfJoining=" + dateOfJoining +
                ", employeeType=" + employeeType +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                '}';
    }

    public String getEmployeeId() {
        return employeeId;
    }
}
