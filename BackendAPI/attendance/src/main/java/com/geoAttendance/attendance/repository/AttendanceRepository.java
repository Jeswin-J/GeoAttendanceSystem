package com.geoAttendance.attendance.repository;
import com.geoAttendance.attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    // Add custom queries if needed
}
