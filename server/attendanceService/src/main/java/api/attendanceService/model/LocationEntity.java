package api.attendanceService.model;

import api.attendanceService.enums.LocationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "location")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;  

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "employeeId", nullable = false)  
    private EmployeeEntity employee;

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
    @NotNull(message = "LocationEntity type cannot be null")
    @Column(nullable = false)
    private LocationType type;

    
    public Long getGeoId() {
        return locationId;
    }

    public void setGeoId(Long locationId) {
        this.locationId = locationId;
    }

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
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

    public Long getLocationId() {
        return this.locationId;
    }
}
