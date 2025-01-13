package com.attendanceSystem.AttendanceSystem.entities;

import com.attendanceSystem.AttendanceSystem.enums.Status;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "check_in_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "check_in_longitude"))
    })
    private Location checkInLocation;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "check_out_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "check_out_longitude"))
    })
    private Location checkOutLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public Location getCheckInLocation() {
        return checkInLocation;
    }

    public void setCheckInLocation(Location checkInLocation) {
        this.checkInLocation = checkInLocation;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public Location getCheckOutLocation() {
        return checkOutLocation;
    }

    public void setCheckOutLocation(Location checkOutLocation) {
        this.checkOutLocation = checkOutLocation;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }


    @Embeddable
    public static class Location {
        private Double latitude;
        private Double longitude;

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }
    }
}
