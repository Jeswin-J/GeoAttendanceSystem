import 'location.dart';

class AttendanceRequest {
  final String employeeId;
  final Location location;

  AttendanceRequest({
    required this.employeeId,
    required this.location,
  });

  factory AttendanceRequest.fromJson(Map<String, dynamic> json) {
    return AttendanceRequest(
      employeeId: json['employeeId'],
      location: Location.fromJson(json['location']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'employeeId': employeeId,
      'location': location.toJson(),
    };
  }
}
