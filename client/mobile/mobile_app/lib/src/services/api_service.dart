import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/attendance_request.dart';
import '../utils/app_constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class APIService {
  final Duration timeoutDuration = const Duration(seconds: 5);

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  Future<T?> fetchData<T>(
      String endpoint, T Function(dynamic json) fromJson) async {
    final String endpointUrl = AppConstants.getEndpoint(
        AppConstants.attendanceService, AppConstants.statusEndpoint);

    print("URL: $endpointUrl");

    final token = await _getToken();

    try {
      final response =
          await http.get(
            Uri.parse(endpointUrl),
            headers: {
              "Authorization": "Bearer $token",
            },
          ).timeout(timeoutDuration);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return fromJson(data);
      } else {
        print("ERROR -> Enna error nu nee ae pathuko: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("ERROR -> Ingae paar: $e");
      return null;
    }
  }

  Future<T?> postData<T>(String endpoint, AttendanceRequest body,
      T Function(dynamic json) fromJson) async {
    final String endpointUrl =
        AppConstants.getEndpoint(AppConstants.attendanceService, endpoint);

    print("POST URL: $endpointUrl");

    try {
      final response = await http
          .post(
            Uri.parse(endpointUrl),
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonEncode(body.toJson()),
          )
          .timeout(timeoutDuration);

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        return fromJson(data);
      } else {
        print("ERROR -> Enna error nu nee ae pathuko: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("ERROR -> Ingae paar: $e");
      return null;
    }
  }


  Future<bool> registerUser(String accessToken, String password) async {
    final String endpointUrl = AppConstants.getEndpoint(
        AppConstants.authService, AppConstants.registerEndpoint);

    try {
      final response = await http
          .post(
        Uri.parse(endpointUrl),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          "accessToken": accessToken,
          "password": password,
        }),
      )
          .timeout(timeoutDuration);

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        if (data['success']) {
          print(data['message']);
          return true;
        }
      } else {
        print("ERROR -> Status code: ${response.statusCode}");
      }
    } catch (e) {
      print("ERROR -> Exception: $e");
    }
    return false;
  }


  Future<T?> login<T>(String employeeId, String password, T Function(dynamic json) fromJson) async {
    final String endpointUrl = AppConstants.getEndpoint(AppConstants.authService, AppConstants.loginEndpoint);

    try {
      final response = await http.post(
        Uri.parse(endpointUrl),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({"employeeId": employeeId, "password": password}),
      ).timeout(timeoutDuration);

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);

        if (data['success'] == true) {
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('jwt_token', data['token']);
        }
        print("HERE:::::");
        return fromJson(data);
      } else {
        print("ERROR: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("ERROR: $e");
      return null;
    }
  }

}
