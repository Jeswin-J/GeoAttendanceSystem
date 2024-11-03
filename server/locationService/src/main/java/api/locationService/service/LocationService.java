package api.locationService.service;

import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Response;
import api.locationService.model.LocationEntity;
import api.locationService.repository.LocationAccessRepository;
import api.locationService.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;

public class LocationService implements Location{

    @Autowired
    private LocationAccessRepository locationAccessRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public Response createNewLocation(NewLocationRequest request) {
        try {
            LocationEntity newLocation = new LocationEntity()
                    .setLocationName(request.getLocationName())
                    .setCreatedAt(new Timestamp(System.currentTimeMillis()))
                    .setAddress(request.getAddress())
                    .setLatitude(request.getLatitude())
                    .setLongitude(request.getLongitude())
                    .setRadius(request.getRadius())
                    .setType(request.getLocationType())
                    .setDivision(request.getDivision());

            locationRepository.save(newLocation);

            return new Response()
                    .setMessage("New Location Added Successfully!")
                    .setSuccess(true);

        } catch (Exception e) {
            return new Response()
                    .setMessage("New Location creation failed!")
                    .setSuccess(false);
        }
    }

}
