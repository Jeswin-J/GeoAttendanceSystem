package api.authService.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
}
