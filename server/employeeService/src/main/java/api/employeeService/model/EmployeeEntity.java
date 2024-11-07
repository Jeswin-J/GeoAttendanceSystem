package api.employeeService.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;
import java.text.DecimalFormat;

@Entity
@Table(name = "employee")
public class EmployeeEntity {

    @Id
    @Column(unique = true, nullable = false)
    @NotBlank(message = "Employee ID cannot be blank")
    private String employeeId;

    @Column(nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(regexp = "^[a-zA-Z0-9._%+-]+@gail\\.in$\n")
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Work email is required")
    private String workEmail;

    @Column(nullable = false)
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid phone number format")
    private String phoneNumber;

    @Column(nullable = false)
    @NotBlank(message = "Role is required")
    private String role;

    @Column(nullable = false)
    @NotBlank(message = "Department is required")
    private String department;

    @Column(nullable = false)
    @NotBlank(message = "Status is required")
    private String status;

    @Column(nullable = false)
    @NotNull(message = "Date of joining is required")
    private LocalDate dateOfJoining;

    @Column(nullable = false)
    @NotBlank(message = "Employee type is required")
    private String employeeType;

    @Column(nullable = false)
    @URL
    @NotBlank(message = "Profile picture URL is required")
    private String profilePictureUrl;

    @Email
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Personal email is required")
    private String personalEmail;


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public void setWorkEmail(String workEmail) {
        this.workEmail = workEmail;
    }

    public static String generateEmployeeId(long id) {
        DecimalFormat format = new DecimalFormat("EMP0000000");
        return format.format(id);
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
    }
}
