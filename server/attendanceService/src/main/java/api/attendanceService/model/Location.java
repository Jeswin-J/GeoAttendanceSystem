package api.attendanceService.model;

import api.attendanceService.enums.LocationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;  

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "employeeId", nullable = false)  
    private Employee employee;

    @NotNull(message = "Timestamp cannot be null")
    @Column(nullable = false)
    private Timestamp timestamp;

    @NotNull(message = "Latitude cannot be null")
    @Column(nullable = false)
    private Double latitude;

    @NotNull(message = "Longitude cannot be null")
    @Column(nullable = false)
    private Double longitude;

    @NotNull(message = "Accuracy cannot be null")
    @Column(nullable = false)
    private Double accuracy;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Location type cannot be null")
    @Column(nullable = false)
    private LocationType type;

    
    public Long getGeoId() {
        return locationId;
    }

    public void setGeoId(Long locationId) {
        this.locationId = locationId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(Double accuracy) {
        this.accuracy = accuracy;
    }

    public LocationType getType() {
        return type;
    }

    public void setType(LocationType type) {
        this.type = type;
    }
}
