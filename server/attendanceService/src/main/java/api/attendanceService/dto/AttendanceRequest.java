package api.attendanceService.dto;

import api.attendanceService.model.Coordinate;
import jakarta.validation.constraints.NotNull;


public class AttendanceRequest {

    @NotNull(message = "Employee ID cannot be null")
    private String employeeId;

    @NotNull(message = "Latitude cannot be null")
    private double latitude;

    @NotNull(message = "Longitude cannot be null")
    private double longitude;


    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    @NotNull(message = "Latitude cannot be null")
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(@NotNull(message = "Latitude cannot be null") double latitude) {
        this.latitude = latitude;
    }

    @NotNull(message = "Longitude cannot be null")
    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(@NotNull(message = "Longitude cannot be null") double longitude) {
        this.longitude = longitude;
    }
}
