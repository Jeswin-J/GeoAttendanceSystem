package api.attendanceService.model;

import api.attendanceService.enums.Status;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Objects;


@Entity
@Table(name = "attendance")
public class AttendanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private Timestamp checkInTimeStamp;

    @Embedded
    private Coordinate checkInLocation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status attendanceStatus;

    @Column(nullable = true)
    private Timestamp checkOutTimeStamp;

    @Embedded
    private Coordinate checkOutLocation;

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal workingHours = BigDecimal.ZERO;


    @PrePersist
    public void prePersist() {
        if (checkInTimeStamp == null) {
            checkInTimeStamp = new Timestamp(System.currentTimeMillis());
        }
    }

    // Getters and Setters

    public Long getAttendanceId() {
        return attendanceId;
    }

    public AttendanceEntity setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
        return this;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public AttendanceEntity setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public Coordinate getCheckInLocation() {
        return checkInLocation;
    }

    public AttendanceEntity setCheckInLocation(Coordinate checkInLocation) {
        this.checkInLocation = checkInLocation;
        return this;
    }

    public Status getAttendanceStatus() {
        return attendanceStatus;
    }

    public AttendanceEntity setAttendanceStatus(Status attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
        return this;
    }

    public Timestamp getCheckOutTimeStamp() {
        return checkOutTimeStamp;
    }

    public AttendanceEntity setCheckOutTimeStamp(Timestamp checkOutTimeStamp) {
        this.checkOutTimeStamp = checkOutTimeStamp;
        return this;
    }

    public Coordinate getCheckOutLocation() {
        return checkOutLocation;
    }

    public AttendanceEntity setCheckOutLocation(Coordinate checkOutLocation) {
        this.checkOutLocation = checkOutLocation;
        return this;
    }

    public BigDecimal getWorkingHours() {
        return workingHours;
    }

    public AttendanceEntity setWorkingHours(BigDecimal workingHours) {
        this.workingHours = workingHours;
        return this;
    }

    public Timestamp getCheckInTimeStamp() {
        return checkInTimeStamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AttendanceEntity that = (AttendanceEntity) o;
        return Objects.equals(attendanceId, that.attendanceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(attendanceId);
    }
}
