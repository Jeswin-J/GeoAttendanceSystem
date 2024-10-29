package api.authService.controller;

import api.authService.dto.AuthRequest;
import api.authService.dto.AuthResponse;
import api.authService.dto.EmailTokenRequest;
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
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) {
        AuthResponse response = authService.register(authRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthRequest loginRequest) {
        String response = authService.verify(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/emailToken")
    public ResponseEntity<Boolean> generateAndEmailToken(@RequestBody EmailTokenRequest request) throws NoSuchAlgorithmException {
        boolean response = authService.emailAccessToken(authService.generateAccessToken(request.getEmployeeId()), request);
        if(response){

        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/health")
    public String healthCheck(){
        return "Hi! naan nala iruken!";
    }
}
