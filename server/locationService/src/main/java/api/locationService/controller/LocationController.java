package api.locationService.controller;

import api.locationService.dto.Request;
import api.locationService.dto.Response;
import api.locationService.service.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/locations")
public class LocationController {

    @Autowired
    private Location location;

    @PostMapping("/new")
    public Response addLocation(Request request){
        return new Response();
    }

    @GetMapping("office/{division}")
    public Response getOfficeLocations(){
        return new Response();
    }

    @PutMapping("/update/{locationId}")
    public Response updateLocation(Request Request){
        return new Response();
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
