package com.geoAttendance.attendance.repository;

import com.geoAttendance.attendance.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long>  {
}
