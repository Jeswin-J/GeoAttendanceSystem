package api.authService.service;

import api.authService.dto.AuthRequest;
import api.authService.dto.AuthResponse;
import api.authService.dto.EmailTokenRequest;
import api.authService.model.CredentialsEntity;

import java.security.NoSuchAlgorithmException;

public interface Auth {

    String generateAccessToken(String employeeId) throws NoSuchAlgorithmException;

    boolean emailAccessToken(String accessToken, EmailTokenRequest request);

    AuthResponse register(AuthRequest authRequest);

    String verify(AuthRequest credentials);

    void saveAccessToken(String accessToken, String receiver, String sender);
}
