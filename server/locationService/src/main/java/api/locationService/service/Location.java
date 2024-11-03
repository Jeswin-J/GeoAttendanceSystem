package api.locationService.service;

import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Request;
import api.locationService.dto.Response;

public interface Location {
    Response createNewLocation(NewLocationRequest request);
}
