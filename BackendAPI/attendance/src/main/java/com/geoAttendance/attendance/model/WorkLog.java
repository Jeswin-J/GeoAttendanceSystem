package com.geoAttendance.attendance.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class WorkLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private LocalDate date;
    private Double totalHours;

}
