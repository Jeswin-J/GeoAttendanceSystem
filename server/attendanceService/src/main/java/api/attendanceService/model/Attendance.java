package api.attendanceService.model;

import api.attendanceService.builder.AttendanceBuilder;
import api.attendanceService.enums.Status;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employeeId", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private Timestamp checkInTimeStamp;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "checkInLocationId", nullable = false)
    private Location checkInLocation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status attendanceStatus;

    @Column(nullable = true)
    private Timestamp checkOutTimeStamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkOutLocationId")
    private Location checkOutLocation;

    @Column(precision = 5, scale = 2)
    private BigDecimal workingHours;

    @Column(nullable = false)
    private boolean anomalyDetected = false;


    public Long getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Long attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Timestamp getCheckInTimeStamp() {
        return checkInTimeStamp;
    }

    public void setCheckInTimeStamp(Timestamp checkInTimeStamp) {
        this.checkInTimeStamp = checkInTimeStamp;
    }

    public Location getCheckInLocation() {
        return checkInLocation;
    }

    public void setCheckInLocation(Location checkInLocation) {
        this.checkInLocation = checkInLocation;
    }

    public Status getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(Status attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }

    public Timestamp getCheckOutTimeStamp() {
        return checkOutTimeStamp;
    }

    public void setCheckOutTimeStamp(Timestamp checkOutTimeStamp) {
        this.checkOutTimeStamp = checkOutTimeStamp;
    }

    public Location getCheckOutLocation() {
        return checkOutLocation;
    }

    public void setCheckOutLocation(Location checkOutLocation) {
        this.checkOutLocation = checkOutLocation;
    }

    public BigDecimal getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(BigDecimal workingHours) {
        this.workingHours = workingHours;
    }
}
