package com.geoAttendance.attendance.repository;

import com.geoAttendance.attendance.model.WorkLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {
}
