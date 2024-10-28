package api.authService.service;

import java.security.NoSuchAlgorithmException;

public interface Auth {
    String generateAccessToken(String employeeId) throws NoSuchAlgorithmException;
    boolean emailAccessToken(String accessToken);
}
