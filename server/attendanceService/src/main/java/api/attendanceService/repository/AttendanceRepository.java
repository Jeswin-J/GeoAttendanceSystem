package api.attendanceService.repository;

import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.model.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {
    AttendanceEntity findTopByEmployeeOrderByCheckInTimeStampDesc(EmployeeEntity employee);

}
