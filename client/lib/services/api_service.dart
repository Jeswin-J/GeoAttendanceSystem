import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String apiUrlCheckIn = "http://192.168.29.111:8080/api/attendance/checkin";
  static const String apiUrlCheckOut = "http://192.168.29.111:8080/api/attendance/checkout";

  static Future<http.Response> checkIn({
    required int employeeId,
    required double latitude,
    required double longitude,
    required String locationDescription,
  }) {
    return http.post(
      Uri.parse(apiUrlCheckIn),
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

  static Future<http.Response> checkOut({
    required int employeeId,
    required double latitude,
    required double longitude,
  }) async {
    final requestBody = jsonEncode({
      'employeeId': employeeId,
      'latitude': latitude,
      'longitude': longitude,
    });

    // Log the request body for debugging
    print('Sending checkOut request with data: $requestBody');

    try {
      final response = await http.post(
        Uri.parse(apiUrlCheckOut),
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      );

      // Log the response for debugging
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      return response;
    } catch (e) {
      print('Error making request: $e');
      rethrow; // Optional: rethrow to allow further handling
    }
  }
}
