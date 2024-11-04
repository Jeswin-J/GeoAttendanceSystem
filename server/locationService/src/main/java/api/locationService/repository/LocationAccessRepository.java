package api.locationService.repository;

import api.locationService.model.LocationAccessEntity;
import api.locationService.model.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationAccessRepository extends JpaRepository<LocationAccessEntity, Long> {

    Optional<LocationAccessEntity> findByLocationAndEmployeeId(Optional<LocationEntity> location, String employeeId);

    List<LocationAccessEntity> findAllByEmployeeId(String employeeId);

    List<LocationAccessEntity> findAllByLocation(Optional<LocationEntity> location);

    Optional<LocationAccessEntity> findByEmployeeIdAndLocation(String employeeId, LocationEntity location);
}
