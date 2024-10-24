package api.attendanceService.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;


public class AttendanceUtils {


    public static BigDecimal calculateWorkHours(Timestamp startTimestamp, Timestamp endTimestamp) {

        LocalDateTime startTime = startTimestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime endTime = endTimestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

        Duration duration = Duration.between(startTime, endTime);
        long totalSeconds = duration.getSeconds();

        return BigDecimal.valueOf(totalSeconds).divide(BigDecimal.valueOf(3600), 2, RoundingMode.HALF_UP);
    }
}
