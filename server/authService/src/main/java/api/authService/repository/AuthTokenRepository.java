package api.authService.repository;

import api.authService.model.AuthTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthTokenRepository extends JpaRepository<AuthTokenEntity, Long> {
}
