package api.attendanceService.service;

import api.attendanceService.dto.CheckInRequest;
import org.springframework.stereotype.Service;

@Service
public interface CheckIn {
    boolean markCheckIn(CheckInRequest checkInRequest);

}
