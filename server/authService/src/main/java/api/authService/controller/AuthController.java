package api.authService.controller;

import api.authService.dto.AuthRequest;
import api.authService.dto.EmailTokenRequest;
import api.authService.dto.Response;
import api.authService.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody AuthRequest authRequest) {
        Response response = authService.register(authRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody AuthRequest loginRequest) {
        Response response = authService.verify(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/emailToken")
    public ResponseEntity<Response> generateAndEmailToken(@RequestBody EmailTokenRequest request) throws NoSuchAlgorithmException {
        Response response = authService.emailAccessToken(authService.generateAccessToken(request.getEmployeeId()), request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/health")
    public String healthCheck(){
        return "Hi! naan nala iruken!";
    }
}
