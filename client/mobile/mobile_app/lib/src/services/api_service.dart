// lib/services/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class APIService {
  final String baseUrl = "http://YOUR_BACKEND_URL/api";

  Future<T?> fetchData<T>(String endpoint, T Function(dynamic json) fromJson) async {
    final url = Uri.parse("$baseUrl/$endpoint");

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return fromJson(data); 
      } else {
        print("Failed to load data: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("Error occurred: $e");
      return null;
    }
  }
}
