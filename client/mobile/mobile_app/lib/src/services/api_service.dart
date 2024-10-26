import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/attendance_request.dart';
import '../utils/app_constants.dart';

class APIService {

  Future<T?> fetchData<T>(String endpoint, T Function(dynamic json) fromJson) async {
    final String endpointUrl = AppConstants.getEndpoint(AppConstants.attendanceService, AppConstants.statusEndpoint);

    print("URL: $endpointUrl");

    try {
      final response = await http.get(Uri.parse(endpointUrl));

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


  Future<T?> postData<T>(String endpoint, AttendanceRequest body, T Function(dynamic json) fromJson) async {
    final String endpointUrl = AppConstants.getEndpoint(AppConstants.attendanceService, endpoint);

    print("POST URL: $endpointUrl");

    try {
      final response = await http.post(
          Uri.parse(endpointUrl),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode(body.toJson()),
      );

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
}
