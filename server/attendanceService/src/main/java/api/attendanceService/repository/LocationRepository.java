package api.attendanceService.repository;

import api.attendanceService.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository  extends JpaRepository<Location, Long> {

}
