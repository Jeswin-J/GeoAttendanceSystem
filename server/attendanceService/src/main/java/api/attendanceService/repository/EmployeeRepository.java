package api.attendanceService.repository;

import api.attendanceService.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findEmployeeByEmployeeId(String employeeId);
}
