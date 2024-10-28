package api.authService.service;

import api.authService.dto.AuthRequest;
import api.authService.dto.AuthResponse;
import api.authService.model.CredentialsEntity;
import api.authService.repository.CredentialsRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService implements Auth{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private CredentialsRepository credentialsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authManager;


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
    public boolean emailAccessToken(String accessToken, String employeeEmail) {
        try{
            Context context = new Context();
            context.setVariable("accessToken", accessToken);

            String emailContent = templateEngine.process("accessTokenEmail", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            helper.setTo(employeeEmail);
            helper.setSubject("GAIL (India) Ltd: Your Secure Access Token");
            helper.setText(emailContent, true);

            mailSender.send(message);

            return true;

        } catch (MessagingException e){
            return false;
        }
    }

    @Override
    public AuthResponse register(AuthRequest registerRequest) {

        CredentialsEntity user = new CredentialsEntity();
        user.setEmployeeId(registerRequest.getEmployeeId());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        credentialsRepository.save(user);

        return new AuthResponse("User registered successfully");
    }


    @Override
    public String verify(AuthRequest authRequest) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmployeeId(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmployeeId());
        } else {
            return "fail";
        }
    }
}
