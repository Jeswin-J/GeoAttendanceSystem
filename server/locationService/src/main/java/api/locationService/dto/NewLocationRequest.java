package api.locationService.dto;

import api.locationService.enums.Division;
import api.locationService.enums.LocationType;

import java.sql.Timestamp;

public class NewLocationRequest extends Request{

    private String locationName;

    private Double latitude;

    private Double longitude;

    private String address;

    private Float radius;

    private LocationType locationType;

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

    public Float getRadius() {
        return radius;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public Division getDivision() {
        return division;
    }

    public String getAddress() {
        return address;
    }
}
