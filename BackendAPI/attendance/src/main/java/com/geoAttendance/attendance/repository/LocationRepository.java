package com.geoAttendance.attendance.repository;

import com.geoAttendance.attendance.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
