package api.authService.repository;

import api.authService.model.AuthTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthTokenRepository extends JpaRepository<AuthTokenEntity, Long> {

    Optional<AuthTokenEntity> findByAccessTokenAndIsInviteAndIsRevoked(String authToken, boolean isInvite, boolean isRevoked);

}
