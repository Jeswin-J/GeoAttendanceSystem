package api.locationService.controller;

import api.locationService.dto.*;
import api.locationService.model.LocationEntity;
import api.locationService.service.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locations")
public class LocationController {

    @Autowired
    private Location location;

    @PostMapping("/new")
    public ResponseEntity<Response> addLocation(NewLocationRequest request){
        Response response = location.createNewLocation(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("office/{division}")
    public ResponseEntity<Response> getOfficeLocations(@PathVariable String division){

        List<LocationEntity> offices = location.getLocationsByDivision(division);

        Response response = new Response()
                .setSuccess(true)
                .setMessage(offices.size() + " Offices found in " + division + " division")
                .setData(offices);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/update/{locationId}")
    public ResponseEntity<Response> updateLocation(@PathVariable Long locationId, @RequestBody UpdateLocationRequest request){
        Response response = location.updateLocation(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/grant/{locationId}")
    public ResponseEntity<Response> grantAccess(@PathVariable Long locationId, AccessRequest request){
        Response response = location.grantLocationAccess(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/revoke/{locationId}")
    public ResponseEntity<Response> revokeAccess(@PathVariable Long locationId, AccessRequest request){
        Response response = location.revokeLocationAccess(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/emp/{employeeId}")
    public ResponseEntity<Response> getEmployeeLocationAccess(@PathVariable String employeeId){
        Response response = location.getProvidedAccess(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("access/{locationId}")
    public ResponseEntity<Response> employeesAtLocation(@PathVariable Long locationId){
        Response response = location.getAllEmployeesAtLocation(locationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
