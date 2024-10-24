package api.attendanceService.builder;

import api.attendanceService.enums.Status;
import api.attendanceService.model.AttendanceEntity;
import api.attendanceService.model.EmployeeEntity;
import api.attendanceService.model.LocationEntity;

public class AttendanceBuilder {
    private AttendanceEntity attendanceEntity;

    public AttendanceBuilder() {
        this.attendanceEntity = new AttendanceEntity();
    }

    public AttendanceBuilder withEmployee(EmployeeEntity employee) {
        attendanceEntity.setEmployee(employee);
        return this;
    }

    public AttendanceBuilder withLocation(LocationEntity locationEntity) {
        attendanceEntity.setCheckInLocation(locationEntity);
        return this;
    }

    public AttendanceBuilder withStatus(Status status) {
        attendanceEntity.setAttendanceStatus(status);
        return this;
    }

    public AttendanceEntity build() {
        return attendanceEntity;
    }
}
