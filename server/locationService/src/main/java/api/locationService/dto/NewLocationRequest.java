package api.locationService.dto;

import api.locationService.enums.Division;
import api.locationService.enums.LocationType;
import jakarta.validation.constraints.NotNull;

public class NewLocationRequest {

    @NotNull
    private String locationName;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @NotNull
    private String address;

    @NotNull
    private Float radius;

    @NotNull
    private LocationType locationType;

    @NotNull
    private Division division;


    public String getLocationName() {
        return locationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getAddress() {
        return address;
    }

    public Float getRadius() {
        return radius;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public Division getDivision() {
        return division;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setRadius(Float radius) {
        this.radius = radius;
    }

    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

}
