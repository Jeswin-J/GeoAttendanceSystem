package api.attendanceService.repository;

import api.attendanceService.model.AttendanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {
    AttendanceEntity findTopByEmployeeIdOrderByCheckInTimeStampDesc(String employeeId);
}
