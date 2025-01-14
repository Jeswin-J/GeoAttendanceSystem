package api.locationService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "location_access", uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "location_id"}))
public class LocationAccessEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationAccessId;

    @Column(nullable = false, unique = true)
    private String employeeId;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "locationId", nullable = false)
    private LocationEntity location;


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

    public LocationEntity getLocation() {
        return location;
    }

    public LocationAccessEntity setLocation(LocationEntity location) {
        this.location = location;
        return this;
    }
}
