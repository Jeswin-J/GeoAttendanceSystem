package api.locationService.model;

import api.locationService.enums.Division;
import api.locationService.enums.LocationType;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "location")
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false, unique = true)
    private Double latitude;

    @Column(nullable = false, unique = true)
    private Double longitude;

    @Column(nullable = false)
    private Float radius;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LocationType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Division division;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = true)
    private Timestamp updatedAt;

    public Long getLocationId() {
        return locationId;
    }

    public LocationEntity setLocationId(Long locationId) {
        this.locationId = locationId;
        return this;
    }

    public String getLocationName() {
        return locationName;
    }

    public LocationEntity setLocationName(String locationName) {
        this.locationName = locationName;
        return this;
    }

    public Double getLatitude() {
        return latitude;
    }

    public LocationEntity setLatitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public Double getLongitude() {
        return longitude;
    }

    public LocationEntity setLongitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public Float getRadius() {
        return radius;
    }

    public LocationEntity setRadius(Float radius) {
        this.radius = radius;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public LocationEntity setAddress(String address) {
        this.address = address;
        return this;
    }

    public LocationType getType() {
        return type;
    }

    public LocationEntity setType(LocationType type) {
        this.type = type;
        return this;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public LocationEntity setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public LocationEntity setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public Division getDivision() {
        return division;
    }

    public LocationEntity setDivision(Division division) {
        this.division = division;
        return this;
    }
}
