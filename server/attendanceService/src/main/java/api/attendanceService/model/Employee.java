package api.attendanceService.model;

import api.attendanceService.enums.Role; 
import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId; 

    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    @Column(name = "name", nullable = false) 
    private String name;  

    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
    @Column(name = "email", unique = true, nullable = false)
    private String email;  

    @NotNull(message = "Role cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @NotNull(message = "Department cannot be null")
    @Size(min = 1, max = 50, message = "Department must be between 1 and 50 characters")
    @Column(name = "department", nullable = false)
    private String department; 

    @NotNull(message = "Location cannot be null")
    @Size(min = 1, max = 100, message = "Location must be between 1 and 100 characters")
    @Column(name = "location", nullable = false)
    private String location;  

    @Column(name = "geo_coordinates", nullable = true)
    private String geoCoordinates; 


    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGeoCoordinates() {
        return geoCoordinates;
    }

    public void setGeoCoordinates(String geoCoordinates) {
        this.geoCoordinates = geoCoordinates;
    }
}
