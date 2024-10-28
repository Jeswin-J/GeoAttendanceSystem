package api.authService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService implements Auth{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public String generateAccessToken(String employeeId) throws NoSuchAlgorithmException {

        long timestamp = System.currentTimeMillis();
        String uniqueInput = employeeId + "-" + timestamp;

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(uniqueInput.getBytes());

        StringBuilder hexString = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString().toUpperCase();
    }


    @Override
    public boolean emailAccessToken(String accessToken) {
        return false;
    }
}
