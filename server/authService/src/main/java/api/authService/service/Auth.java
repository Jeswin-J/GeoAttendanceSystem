package api.authService.service;

import api.authService.dto.AuthRequest;
import api.authService.dto.EmailTokenRequest;
import api.authService.dto.Response;

import java.security.NoSuchAlgorithmException;

public interface Auth {

    String generateAccessToken(String employeeId) throws NoSuchAlgorithmException;

    Response emailAccessToken(String accessToken, EmailTokenRequest request);

    Response register(AuthRequest authRequest);

    Response verify(AuthRequest credentials);

    void saveAccessToken(String accessToken, String receiver, String sender);
}
