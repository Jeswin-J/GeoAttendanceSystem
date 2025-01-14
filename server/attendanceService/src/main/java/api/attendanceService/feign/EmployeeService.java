package api.attendanceService.feign;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "EMPLOYEESERVICE" )
public interface EmployeeService {

    @GetMapping("/api/emp/{employeeId}/exists")
    public ResponseEntity<Boolean> employeeExists(@PathVariable String employeeId);

}
