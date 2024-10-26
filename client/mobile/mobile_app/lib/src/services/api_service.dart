// lib/services/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

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
}
