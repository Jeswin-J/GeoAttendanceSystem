package api.attendanceService.service;

import api.attendanceService.dto.CheckInRequest;

public interface CheckIn {
    public boolean markCheckIn(CheckInRequest checkInRequest);


}
