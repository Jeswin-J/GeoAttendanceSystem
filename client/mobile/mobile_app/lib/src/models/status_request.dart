import 'employee.dart';
import 'location.dart';

class StatusRequest {
  final int attendanceId;
  final Employee employee;
  final DateTime checkInTimeStamp;
  final String attendanceStatus;
  final DateTime? checkOutTimeStamp;
  final double workingHours;
  final Location checkInLocation;
  final Location? checkOutLocation;

  StatusRequest({
    required this.attendanceId,
    required this.employee,
    required this.checkInTimeStamp,
    required this.attendanceStatus,
    this.checkOutTimeStamp,
    required this.workingHours,
    required this.checkInLocation,
    this.checkOutLocation,
  });

  factory StatusRequest.fromJson(Map<String, dynamic> json) {
    return StatusRequest(
      attendanceId: json['attendanceId'],
      employee: Employee.fromJson(json['employee']),
      checkInTimeStamp: DateTime.parse(json['checkInTimeStamp']),
      attendanceStatus: json['attendanceStatus'],
      checkOutTimeStamp: json['checkOutTimeStamp'] != null
          ? DateTime.parse(json['checkOutTimeStamp'])
          : null,
      workingHours: json['workingHours'] != null ?
      json['workingHours'].toDouble() : 0.0,
      checkInLocation: Location.fromJson(json['checkInLocation']),
      checkOutLocation: json['checkOutLocation'] != null
          ? Location.fromJson(json['checkOutLocation'])
          : null,
    );
  }
}
