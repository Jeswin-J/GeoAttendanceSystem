package api.attendanceService.repository;

import api.attendanceService.model.Attendance;
import api.attendanceService.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findTopByEmployeeOrderByCheckInTimeStampDesc(Employee employee);

}
