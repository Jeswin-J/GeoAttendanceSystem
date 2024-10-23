package api.attendanceService.builder;

import api.attendanceService.enums.Status;
import api.attendanceService.model.Attendance;
import api.attendanceService.model.Employee;
import api.attendanceService.model.Location;

import java.sql.Timestamp;

public class AttendanceBuilder {
    private Attendance attendance;

    public AttendanceBuilder() {
        this.attendance = new Attendance();
    }

    public AttendanceBuilder withEmployee(Employee employee) {
        attendance.setEmployee(employee);
        return this;
    }

    public AttendanceBuilder withCheckInTimeStamp(Timestamp checkInTimeStamp) {
        attendance.setCheckInTimeStamp(checkInTimeStamp);
        return this;
    }

    public AttendanceBuilder withLocation(Location location) {
        attendance.setCheckInLocation(location);
        return this;
    }

    public AttendanceBuilder withStatus(Status status) {
        attendance.setAttendanceStatus(status);
        return this;
    }

    public Attendance build() {
        return attendance;
    }
}
