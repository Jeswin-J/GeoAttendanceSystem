package api.authService.repository;

import api.authService.model.CredentialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialsRepository extends JpaRepository<CredentialsEntity, Long> {

}
