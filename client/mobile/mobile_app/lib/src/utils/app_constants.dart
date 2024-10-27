class AppConstants {
  static const String baseUrl = "http://192.168.29.111:8080/api";

  static const String attendanceService = 'attendance';

  static const String statusEndpoint = 'status/E2';

  static String getEndpoint(String serviceName, String endpoint) {
    return '$baseUrl/$serviceName/$endpoint';
  }
}
