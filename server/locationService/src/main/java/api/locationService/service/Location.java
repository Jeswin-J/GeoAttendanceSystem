package api.locationService.service;

import api.locationService.dto.AccessRequest;
import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Response;
import api.locationService.dto.UpdateLocationRequest;
import api.locationService.model.LocationEntity;

import java.util.List;

public interface Location {
    Response createNewLocation(NewLocationRequest request);

    List<LocationEntity> getLocationsByDivision(String division);

    Response updateLocation(Long locationId, UpdateLocationRequest request);

    Response grantLocationAccess(Long locationId, AccessRequest request);

    Response revokeLocationAccess(Long locationId, AccessRequest request);

    Response getProvidedAccess(String employeeId);

    Response getAllEmployeesAtLocation(Long locationId);

    Response getAllLocations();

    Response getLocationById(Long locationId);

    Response deleteLocation(Long locationId);
}
