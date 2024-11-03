package api.locationService.repository;

import api.locationService.model.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocationRepository extends JpaRepository<LocationEntity, Long> {

    List<LocationEntity> findByDivision(String division);
}
