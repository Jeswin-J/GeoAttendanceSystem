package api.attendanceService.repository;

import api.attendanceService.model.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    EmployeeEntity findEmployeeByEmployeeId(String employeeId);
}
