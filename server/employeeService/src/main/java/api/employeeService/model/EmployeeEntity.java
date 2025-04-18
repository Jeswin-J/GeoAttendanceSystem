package api.employeeService.model;

import api.employeeService.enums.Department;
import api.employeeService.enums.Designation;
import api.employeeService.enums.Status;
import api.employeeService.enums.WorkType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String employeeId;

    @Column(nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(regexp = "^[a-zA-Z0-9._%+-]+@gail\\.in$")
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Work email is required")
    private String workEmail;

    @Column(nullable = false)
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid phone number format")
    private String phoneNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Designation is required")
    private Designation designation;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Department is required")
    private Department department;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private Status status = Status.INACTIVE;

    @Column(nullable = false)
    @NotNull(message = "Date of joining is required")
    private LocalDate dateOfJoining;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Employee type is required")
    private WorkType employeeType;

    @Column(unique = true)
    @URL
    private String profilePictureUrl;


    public String getEmployeeId() {
        return employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public EmployeeEntity setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public EmployeeEntity setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public EmployeeEntity setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public Designation getDesignation() {
        return designation;
    }

    public EmployeeEntity setDesignation(Designation designation) {
        this.designation = designation;
        return this;
    }

    public Department getDepartment() {
        return department;
    }

    public EmployeeEntity setDepartment(Department department) {
        this.department = department;
        return this;
    }

    public Status getStatus() {
        return status;
    }

    public EmployeeEntity setStatus(Status status) {
        this.status = status;
        return this;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public EmployeeEntity setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
        return this;
    }

    public WorkType getEmployeeType() {
        return employeeType;
    }

    public EmployeeEntity setEmployeeType(WorkType employeeType) {
        this.employeeType = employeeType;
        return this;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public EmployeeEntity setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
        return this;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public EmployeeEntity setWorkEmail(String workEmail) {
        this.workEmail = workEmail;
        return this;
    }

    public EmployeeEntity setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
        return this;
    }
}
