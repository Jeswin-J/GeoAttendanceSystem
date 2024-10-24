package api.attendanceService.dto;

import jakarta.validation.constraints.NotNull;


public class AttendanceRequest {

    @NotNull(message = "EmployeeEntity ID cannot be null")
    private String employeeId;

    @NotNull(message = "LocationEntity cannot be null")
    private LocationDTO location;


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }
}
