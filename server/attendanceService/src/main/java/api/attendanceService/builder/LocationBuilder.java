package api.attendanceService.builder;

import api.attendanceService.enums.LocationType;
import api.attendanceService.model.Employee;
import api.attendanceService.model.Location;


public class LocationBuilder {
    private Location location;

    public LocationBuilder() {
        this.location = new Location();
    }

    public LocationBuilder withEmployee(Employee employee) {
        location.setEmployee(employee);
        return this;
    }

    public LocationBuilder withLatitude(Double latitude) {
        location.setLatitude(latitude);
        return this;
    }

    public LocationBuilder withLongitude(Double longitude) {
        location.setLongitude(longitude);
        return this;
    }

    public LocationBuilder withAccuracy(Double accuracy) {
        location.setAccuracy(accuracy);
        return this;
    }

    public LocationBuilder withLocationType(LocationType type) {
        location.setType(type);
        return this;
    }

    public Location build() {
        return location;
    }
}
