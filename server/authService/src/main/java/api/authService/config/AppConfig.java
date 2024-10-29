package api.authService.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
public class AppConfig {

    @Bean
    public SpringTemplateEngine templateEngine() {
        return new SpringTemplateEngine();
    }
}

