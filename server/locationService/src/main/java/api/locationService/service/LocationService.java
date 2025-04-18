package api.locationService.service;

import api.locationService.dto.AccessRequest;
import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Response;
import api.locationService.dto.UpdateLocationRequest;
import api.locationService.enums.Division;
import api.locationService.model.LocationAccessEntity;
import api.locationService.model.LocationEntity;
import api.locationService.repository.LocationAccessRepository;
import api.locationService.repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;


@Service
public class LocationService implements Location {

    @Autowired
    LocationAccessRepository locationAccessRepository;

    @Autowired
    LocationRepository locationRepository;

    @Override
    public Response createNewLocation(NewLocationRequest request) {
        try {

            boolean exists = locationRepository.existsByDivisionAndTypeAndLatitudeAndLongitude(
                    request.getDivision(),
                    request.getLocationType(),
                    request.getLatitude(),
                    request.getLongitude()
            );

            if (exists) {
                return new Response()
                        .setMessage("A similar location already exists!")
                        .setSuccess(false);
            }
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
                    .setMessage("New Location creation failed! " + e.getMessage())
                    .setSuccess(false);
        }
    }

    @Override
    public List<LocationEntity> getLocationsByDivision(String division) {
        return locationRepository.findByDivision(Division.valueOf(division.toUpperCase()));
    }

    @Override
    public Response updateLocation(Long locationId, UpdateLocationRequest request) {

        Optional<LocationEntity> existingLocationOp = locationRepository.findById(locationId);

        if (existingLocationOp.isPresent()) {
            LocationEntity existingLocation = existingLocationOp.get();

            request.getLocationName().ifPresent(existingLocation::setLocationName);
            request.getLatitude().ifPresent(existingLocation::setLatitude);
            request.getLongitude().ifPresent(existingLocation::setLongitude);
            request.getRadius().ifPresent(existingLocation::setRadius);
            request.getAddress().ifPresent(existingLocation::setAddress);
            request.getLocationType().ifPresent(existingLocation::setType);
            request.getDivision().ifPresent(existingLocation::setDivision);

            existingLocation.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            locationRepository.save(existingLocation);

            return new Response()
                    .setSuccess(true)
                    .setMessage("Location Updated Successfully");
        }

        return new Response()
                .setSuccess(true)
                .setMessage("No Location found with ID: " + locationId);
    }

    @Override
    public Response grantLocationAccess(Long locationId, AccessRequest request) {
        Optional<LocationEntity> existingLocationOp = locationRepository.findById(locationId);

        if (existingLocationOp.isPresent()) {
            LocationEntity location = existingLocationOp.get();

            LocationAccessEntity locationAccess = new LocationAccessEntity()
                    .setEmployeeId(request.getEmployeeId())
                    .setLocation(location);

            try{
                locationAccessRepository.save(locationAccess);
            } catch (Exception e){
                return new Response()
                        .setMessage("Access Granter Already to employee " + request.getEmployeeId())
                        .setSuccess(false);
            }

            return new Response()
                    .setMessage("Access Granted to location " + location.getLocationName())
                    .setSuccess(true);
        }

        return new Response()
                .setMessage("Failed! May be due to invalid Location Id")
                .setSuccess(false);
    }

    @Override
    public Response revokeLocationAccess(Long locationId, AccessRequest request) {

        Optional<LocationAccessEntity> accessGrantOpt = locationAccessRepository
                .findByLocationAndEmployeeId(locationRepository.findById(locationId), request.getEmployeeId());

        if (accessGrantOpt.isEmpty()) {
            return new Response()
                    .setSuccess(false)
                    .setMessage("No access found for employee ID: " + request.getEmployeeId() + " at location ID: " + locationId);
        }

        locationAccessRepository.delete(accessGrantOpt.get());

        return new Response()
                .setMessage("Access revoked successfully for employee ID: " + request.getEmployeeId())
                .setSuccess(true);
    }

    @Override
    public Response getProvidedAccess(String employeeId) {

        List<LocationAccessEntity> locationAccessList = locationAccessRepository
                .findAllByEmployeeId(employeeId);

        if (!locationAccessList.isEmpty()) {
            // Since only one location is allowed, we fetch the first location from the list
            LocationAccessEntity access = locationAccessList.get(0);
            LocationEntity location = new LocationEntity()
                    .setLocationName(access.getLocation().getLocationName())
                    .setAddress(access.getLocation().getAddress())
                    .setDivision(access.getLocation().getDivision())
                    .setRadius(access.getLocation().getRadius())
                    .setLatitude(access.getLocation().getLatitude())
                    .setLongitude(access.getLocation().getLongitude())
                    .setCreatedAt(access.getLocation().getCreatedAt())
                    .setUpdatedAt(access.getLocation().getUpdatedAt())
                    .setType(access.getLocation().getType())
                    .setLocationId(access.getLocation().getLocationId());

            return new Response()
                    .setSuccess(true)
                    .setMessage("Employee " + employeeId + " has access to the location: " + location.getLocationName())
                    .setData(location); // Return a single location
        }

        return new Response()
                .setSuccess(false)
                .setMessage("No access found for employee ID: " + employeeId);
    }


    @Override
    public Response getAllEmployeesAtLocation(Long locationId) {
        List<LocationAccessEntity> accessRecords = locationAccessRepository
                .findAllByLocation(locationRepository.findById(locationId));

        if (!accessRecords.isEmpty()) {
            List<String> employees = accessRecords.stream()
                    .map(LocationAccessEntity::getEmployeeId)
                    .toList();

            return new Response()
                    .setMessage(employees.size() + " Employees have Access to Location " + locationId)
                    .setSuccess(true)
                    .setData(accessRecords);
        }

        return new Response()
                .setSuccess(false)
                .setMessage("No employees found with access to location ID: " + locationId);
    }

    @Override
    public Response getAllLocations() {
        try {
            List<LocationEntity> allLocations = locationRepository.findAll();

            return new Response()
                    .setMessage("Locations fetched successfully.")
                    .setSuccess(true)
                    .setData(allLocations);

        } catch (Exception e) {
            return new Response()
                    .setMessage("Failed to fetch locations: " + e.getMessage())
                    .setSuccess(false);
        }
    }

    @Override
    public Response getLocationById(Long locationId) {
        Optional<LocationEntity> locationDetails = locationRepository.findById(locationId);

        if(locationDetails.isPresent()){
            return new Response()
                    .setMessage("Got Location Details!")
                    .setSuccess(true)
                    .setData(locationDetails.get());
        }

        return new Response()
                .setMessage("No such location found!")
                .setSuccess(false);
    }

    @Override
    @Transactional
    public Response deleteLocation(Long locationId) {
        if (!locationRepository.existsById(locationId)) {
            return new Response()
                    .setSuccess(false)
                    .setMessage("Location not found!");
        }

        locationRepository.deleteById(locationId);

        return new Response()
                .setSuccess(true)
                .setMessage("Location deleted successfully!");
    }

}
