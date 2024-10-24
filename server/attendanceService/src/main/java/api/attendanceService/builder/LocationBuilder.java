package api.attendanceService.builder;

import api.attendanceService.enums.LocationType;
import api.attendanceService.model.EmployeeEntity;
import api.attendanceService.model.LocationEntity;


public class LocationBuilder {
    private LocationEntity locationEntity;

    public LocationBuilder() {
        this.locationEntity = new LocationEntity();
    }

    public LocationBuilder withEmployee(EmployeeEntity employee) {
        locationEntity.setEmployee(employee);
        return this;
    }

    public LocationBuilder withLatitude(Double latitude) {
        locationEntity.setLatitude(latitude);
        return this;
    }

    public LocationBuilder withLongitude(Double longitude) {
        locationEntity.setLongitude(longitude);
        return this;
    }

    public LocationBuilder withAccuracy(Double accuracy) {
        locationEntity.setAccuracy(accuracy);
        return this;
    }

    public LocationBuilder withLocationType(LocationType type) {
        locationEntity.setType(type);
        return this;
    }

    public LocationEntity build() {
        return locationEntity;
    }
}
