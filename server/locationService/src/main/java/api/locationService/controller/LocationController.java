package api.locationService.controller;

import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Request;
import api.locationService.dto.Response;
import api.locationService.dto.UpdateLocationRequest;
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

    @PostMapping("/grant")
    public Response grantAccess(Request request){
        return new Response();
    }

    @DeleteMapping("/revoke")
    public Response revokeAccess(Request request){
        return new Response();
    }

    @GetMapping("/emp/{employeeId}")
    public Response getEmployeeLocationAccess(){
        return new Response();
    }

    @GetMapping("access/{locationId}")
    public Response employeesAtLocation(){
        return new Response();
    }

}
