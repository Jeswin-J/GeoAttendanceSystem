package api.attendanceService.dto;

import java.io.Serializable;

public class AttendanceResponse implements Serializable {
    private String employeeId;
    private String timestamp;
    private Double latitude;
    private Double longitude;

    public AttendanceResponse(String employeeId, String timestamp, Double latitude, Double longitude) {
        this.employeeId = employeeId;
        this.timestamp = timestamp;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
}
