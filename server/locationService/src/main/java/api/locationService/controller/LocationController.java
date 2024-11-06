package api.locationService.controller;

import api.locationService.dto.AccessRequest;
import api.locationService.dto.NewLocationRequest;
import api.locationService.dto.Response;
import api.locationService.dto.UpdateLocationRequest;
import api.locationService.model.LocationEntity;
import api.locationService.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/")
    public ResponseEntity<Response> allLocations(){
        Response response = locationService.getAllLocations();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<Response> allLocations(@PathVariable Long locationId){
        Response response = locationService.getLocationById(locationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/new")
    public ResponseEntity<Response> addLocation(@RequestBody NewLocationRequest request){
        Response response = locationService.createNewLocation(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("office/{division}")
    public ResponseEntity<Response> getOfficeLocations(@PathVariable String division){
        try {
            List<LocationEntity> offices = locationService.getLocationsByDivision(division);

            Response response = new Response()
                    .setSuccess(true)
                    .setMessage(offices.size() + " Offices found in " + division + " division")
                    .setData(offices);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e){
            Response response = new Response()
                    .setSuccess(false)
                    .setMessage("No such Division found!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update/{locationId}")
    public ResponseEntity<Response> updateLocation(@PathVariable Long locationId, @RequestBody UpdateLocationRequest request){
        Response response = locationService.updateLocation(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/grant/{locationId}")
    public ResponseEntity<Response> grantAccess(@PathVariable Long locationId, @RequestBody AccessRequest request){
        Response response = locationService.grantLocationAccess(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/revoke/{locationId}")
    public ResponseEntity<Response> revokeAccess(@PathVariable Long locationId, @RequestBody AccessRequest request){
        Response response = locationService.revokeLocationAccess(locationId, request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/emp/{employeeId}")
    public ResponseEntity<Response> getEmployeeLocationAccess(@PathVariable String employeeId){
        Response response = locationService.getProvidedAccess(employeeId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("access/{locationId}")
    public ResponseEntity<Response> employeesAtLocation(@PathVariable Long locationId){
        Response response = locationService.getAllEmployeesAtLocation(locationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
