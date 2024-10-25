import 'employee.dart';
import 'location.dart';

class Attendance {
  final int attendanceId;
  final Employee employee;
  final DateTime checkInTimeStamp;
  final String attendanceStatus;
  final DateTime? checkOutTimeStamp;
  final double workingHours;
  final Location checkInLocation;
  final Location checkOutLocation;

  Attendance({
    required this.attendanceId,
    required this.employee,
    required this.checkInTimeStamp,
    required this.attendanceStatus,
    required this.checkOutTimeStamp,
    required this.workingHours,
    required this.checkInLocation,
    required this.checkOutLocation,
  });

  factory Attendance.fromJson(Map<String, dynamic> json) {
    return Attendance(
      attendanceId: json['attendanceId'],
      employee: Employee.fromJson(json['employee']),
      checkInTimeStamp: DateTime.parse(json['checkInTimeStamp']),
      attendanceStatus: json['attendanceStatus'],
      checkOutTimeStamp: json['checkOutTimeStamp'] != null
          ? DateTime.parse(json['checkOutTimeStamp'])
          : null,
      workingHours: json['workingHours'].toDouble(),
      checkInLocation: Location.fromJson(json['checkInLocation']),
      checkOutLocation: Location.fromJson(json['checkOutLocation']),
    );
  }
}