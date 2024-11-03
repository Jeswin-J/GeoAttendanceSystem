package api.locationService.repository;

import api.locationService.model.LocationAccessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationAccessRepository extends JpaRepository<LocationAccessEntity, Long> {

    Optional<LocationAccessEntity> findByLocationIdAndEmployeeId(Long locationId, String employeeId);

    List<LocationAccessEntity> findAllByEmployeeId(String employeeId);

    List<LocationAccessEntity> findAllByLocationId(Long locationId);
}
