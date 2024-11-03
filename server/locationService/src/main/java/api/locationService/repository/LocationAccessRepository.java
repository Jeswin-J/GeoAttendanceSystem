package api.locationService.repository;

import api.locationService.model.LocationAccessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationAccessRepository extends JpaRepository<LocationAccessEntity, Long> {

    Optional<LocationAccessEntity> findByLocationIdAndEmployeeId(Long locationId, String employeeId);
}
