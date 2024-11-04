package api.locationService.repository;

import api.locationService.enums.Division;
import api.locationService.enums.LocationType;
import api.locationService.model.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Long> {

    List<LocationEntity> findByDivision(Division division);

    boolean existsByDivisionAndTypeAndLatitudeAndLongitude(Division division, LocationType type, double latitude, double longitude);

}
