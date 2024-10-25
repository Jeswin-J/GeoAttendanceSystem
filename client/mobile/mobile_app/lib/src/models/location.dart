import 'employee.dart';

class Location {
  final Employee employee;
  final double latitude;
  final double longitude;
  final double accuracy;
  final String type;
  final int geoId;

  Location({
    required this.employee,
    required this.latitude,
    required this.longitude,
    required this.accuracy,
    required this.type,
    required this.geoId,
  });

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      employee: Employee.fromJson(json['employee']),
      latitude: json['latitude'],
      longitude: json['longitude'],
      accuracy: json['accuracy'],
      type: json['type'],
      geoId: json['geoId'],
    );
  }
}