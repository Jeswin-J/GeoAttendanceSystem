package api.locationService.repository;

import api.locationService.model.LocationAccessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationAccessRepository extends JpaRepository<LocationAccessEntity, Long> {

}
