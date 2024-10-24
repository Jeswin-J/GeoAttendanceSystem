package api.attendanceService.repository;

import api.attendanceService.model.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository  extends JpaRepository<LocationEntity, Long> {

}
