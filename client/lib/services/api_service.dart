import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String apiUrl = "http://192.168.29.111:8080/api/attendance/checkin";

  static Future<http.Response> checkIn({
    required int employeeId,
    required double latitude,
    required double longitude,
    required String locationDescription,
  }) {
    return http.post(
      Uri.parse(apiUrl),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'employeeId': employeeId,
        'latitude': latitude,
        'longitude': longitude,
        'locationDescription': locationDescription,
      }),
    );
  }
}
