package api.attendanceService.service;

import org.springframework.stereotype.Service;

@Service
public class CheckOutService implements CheckOut{

    @Override
    public boolean markCheckOut() {
        return false;
    }
}
