package api.authService.service;

import api.authService.dto.AuthRequest;
import api.authService.dto.LoginResponse;
import api.authService.dto.EmailTokenRequest;
import api.authService.dto.Response;
import api.authService.model.AuthTokenEntity;
import api.authService.model.CredentialsEntity;
import api.authService.repository.AuthTokenRepository;
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
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.Optional;

@Service
public class AuthService implements Auth {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    private CredentialsRepository credentialsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthTokenRepository authTokenRepository;

    @Autowired
    private AuthenticationManager authManager;

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
    public Response emailAccessToken(String accessToken, EmailTokenRequest request) {
        try {
            Context context = new Context();
            context.setVariable("accessToken", accessToken);

            String emailContent = templateEngine.process("accessTokenEmail.html", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
            if (request.getEmployeeEmail().matches(emailRegex)) {
                helper.setTo(request.getEmployeeEmail().trim());
            } else {
                return new Response()
                        .setSuccess(false)
                        .setMessage("Invalid Email Address");
            }
            helper.setSubject("GAIL (India) Ltd: Your Secure Access Token");
            helper.setText(emailContent, true);

            mailSender.send(message);
            saveAccessToken(accessToken, request.getEmployeeId(), request.getSenderEmployeeId());
            return new Response()
                    .setMessage("Access Token sent to email " + request.getEmployeeEmail())
                    .setSuccess(true);

        } catch (MessagingException e) {
            return new Response()
                    .setSuccess(false)
                    .setMessage("Failed to send access token due to " + e.getMessage());
        }
    }

    @Override
    public Response register(AuthRequest registerRequest) {
        Optional<AuthTokenEntity> inviteToken = authTokenRepository.findByAccessTokenAndIsInviteAndIsRevoked(
                registerRequest.getAccessToken(), true, false);

        if (inviteToken.isEmpty()) {
            return new Response()
                    .setMessage("Invalid Access Token")
                    .setSuccess(false);
        }

        CredentialsEntity userCredentials = credentialsRepository.findByEmployeeId(inviteToken.get().getCredentials().getEmployeeId())
                    .setPassword(passwordEncoder.encode(registerRequest.getPassword()))
                    .setActive(true);

        credentialsRepository.save(userCredentials);

        AuthTokenEntity tokenEntity = inviteToken.get().setRevoked(true);
        authTokenRepository.save(tokenEntity);

        return new Response()
                .setMessage("User Registration Successful")
                .setSuccess(true);
    }

    @Override
    public Response verify(AuthRequest authRequest) {

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmployeeId(), authRequest.getPassword()));

        System.out.println("Request Here "+ authRequest.getPassword() + authRequest.getEmployeeId() + authentication.isAuthenticated());
        if (authentication.isAuthenticated()) {
            return new LoginResponse()
                    .setToken(jwtService.generateToken(authRequest.getEmployeeId()))
                    .setSuccess(true)
                    .setMessage("Login Successful");
        }

        return new Response()
                .setMessage("Login Failed")
                .setSuccess(false);
    }


    @Override
    public void saveAccessToken(String accessToken, String receiver, String sender) {

        CredentialsEntity credentials = new CredentialsEntity()
                .setEmployeeId(receiver);

        credentials = credentialsRepository.save(credentials);

        AuthTokenEntity authToken = new AuthTokenEntity()
                .setAccessToken(accessToken)
                .setIssuedTimestamp(new Timestamp(System.currentTimeMillis()))
                .setExpiryTimestamp(new Timestamp(System.currentTimeMillis() + 48 * 3600 * 1000))
                .setRevoked(false)
                .setInvite(true)
                .setInvitedBy(sender)
                .setCredentials(credentials);

        authTokenRepository.save(authToken);
    }
}
