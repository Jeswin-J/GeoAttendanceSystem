import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../utils/app_constants.dart';
import '../utils/helper.dart';

class APIService {
  final Duration timeoutDuration = const Duration(seconds: 5);
  final AppUtils appUtils = AppUtils();

  Future<Map<String, dynamic>?> login(String employeeId, String password) async {
    final String endpointUrl = AppConstants.getEndpoint(
        'auth', AppConstants.loginEndpoint);

    try {
      final response = await http
          .post(
        Uri.parse(endpointUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"employeeId": employeeId, "password": password}),
      )
          .timeout(timeoutDuration);

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        if (data['success'] == true) {
          await appUtils.storeToken(data['token']);
          return data;
        }
      }
    } catch (e) {
      print("Login API Error: $e");
    }
    return null;
  }

  Future<Map<String, dynamic>?> fetchEmployeeData(String employeeId) async {
    final String endpointUrl = AppConstants.getEndpoint(
        'emp', AppConstants.empDataEndpoint, pathParams: employeeId);

    final token = await appUtils.getToken();

    try {
      final response = await http
          .get(
        Uri.parse(endpointUrl),
        headers: {"Authorization": "Bearer $token"},
      )
          .timeout(timeoutDuration);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['success'] == true) {
          await appUtils.storeEmployeeData(data['data']);
          return data['data'];
        }
      }
    } catch (e) {
      print("Fetch Employee Data API Error: $e");
    }
    return null;
  }

  Future<Map<String, dynamic>?> getStoredEmployeeData() async {
    final prefs = await SharedPreferences.getInstance();
    final employeeData = prefs.getString('employeeData');
    if (employeeData != null) {
      return jsonDecode(employeeData);
    }
    return null;
  }

  Future<bool> registerUser(String accessToken, String password) async {
    final String endpointUrl = AppConstants.getEndpoint(
        'auth', AppConstants.registerEndpoint);

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
}
