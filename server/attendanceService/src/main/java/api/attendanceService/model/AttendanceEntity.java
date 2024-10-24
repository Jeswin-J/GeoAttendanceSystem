package api.attendanceService.model;

import api.attendanceService.enums.Status;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "attendance")
public class AttendanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employeeId", nullable = false)
    private EmployeeEntity employee;

    @Column(nullable = false)
    private Timestamp checkInTimeStamp = new Timestamp(System.currentTimeMillis());

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "checkInLocationId", nullable = false)
    private LocationEntity checkInLocationEntity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status attendanceStatus;

    @Column(nullable = true)
    private Timestamp checkOutTimeStamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkOutLocationId")
    private LocationEntity checkOutLocationEntity;

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

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    public LocationEntity getCheckInLocation() {
        return checkInLocationEntity;
    }

    public void setCheckInLocation(LocationEntity checkInLocationEntity) {
        this.checkInLocationEntity = checkInLocationEntity;
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

    public LocationEntity getCheckOutLocation() {
        return checkOutLocationEntity;
    }

    public void setCheckOutLocation(LocationEntity checkOutLocationEntity) {
        this.checkOutLocationEntity = checkOutLocationEntity;
    }

    public BigDecimal getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(BigDecimal workingHours) {
        this.workingHours = workingHours;
    }
}
