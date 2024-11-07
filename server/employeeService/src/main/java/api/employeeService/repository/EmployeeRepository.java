package api.employeeService.repository;

import api.employeeService.model.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String> {
    Optional<EmployeeEntity> findByEmployeeId(String workEmail);
}
