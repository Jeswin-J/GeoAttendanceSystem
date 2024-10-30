package api.locationService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "location_access")
public class LocationAccessEntity {
    @Id
    private Long locationAccessId;

    @Column(nullable = false)
    private String employeeId;

    @ManyToOne
    @Column(nullable = false)
    @JoinColumn(name = "locationId", nullable = false)
    private LocationEntity locationId;

    @Column(nullable = false)
    private Boolean isAccessRevoked = false;

    public Long getLocationAccessId() {
        return locationAccessId;
    }

    public LocationAccessEntity setLocationAccessId(Long locationAccessId) {
        this.locationAccessId = locationAccessId;
        return this;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public LocationAccessEntity setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public LocationEntity getLocationId() {
        return locationId;
    }

    public LocationAccessEntity setLocationId(LocationEntity locationId) {
        this.locationId = locationId;
        return this;
    }

    public Boolean getAccessRevoked() {
        return isAccessRevoked;
    }

    public LocationAccessEntity setAccessRevoked(Boolean accessRevoked) {
        isAccessRevoked = accessRevoked;
        return this;
    }
}
