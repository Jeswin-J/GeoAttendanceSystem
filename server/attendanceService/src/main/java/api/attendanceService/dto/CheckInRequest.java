package api.attendanceService.dto;

import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;

public class CheckInRequest {

    @NotNull(message = "Employee ID cannot be null")
    private String employeeId;

    @NotNull(message = "Check-in Timestamp cannot be null")
    private Timestamp checkInTimestamp;

    @NotNull(message = "Location cannot be null")
    private LocationDTO location;

    // Getters and Setters
    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Timestamp getCheckInTimestamp() {
        return checkInTimestamp;
    }

    public void setCheckInTimestamp(Timestamp checkInTimestamp) {
        this.checkInTimestamp = checkInTimestamp;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }
}
