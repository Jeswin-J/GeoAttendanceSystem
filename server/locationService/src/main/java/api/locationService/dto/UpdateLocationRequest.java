package api.locationService.dto;

import api.locationService.enums.Division;
import api.locationService.enums.LocationType;

import java.util.Optional;

public class UpdateLocationRequest {

    private Optional<String> locationName = Optional.empty();

    private Optional<Double> latitude = Optional.empty();

    private Optional<Double> longitude = Optional.empty();

    private Optional<String> address = Optional.empty();

    private Optional<Float> radius = Optional.empty();

    private Optional<LocationType> locationType = Optional.empty();

    private Optional<Division> division = Optional.empty();


    public Optional<String> getLocationName() {
        return locationName;
    }

    public Optional<Double> getLatitude() {
        return latitude;
    }

    public Optional<Double> getLongitude() {
        return longitude;
    }

    public Optional<String> getAddress() {
        return address;
    }

    public Optional<Float> getRadius() {
        return radius;
    }

    public Optional<LocationType> getLocationType() {
        return locationType;
    }

    public Optional<Division> getDivision() {
        return division;
    }
}
