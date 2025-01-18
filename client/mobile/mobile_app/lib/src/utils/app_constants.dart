class AppConstants {

  // Strings
  static const String employeeData = "employeeData";

  // Asset Paths
  static const String successAnimation = "assets/animations/success.json";
  static const String profileImagePath = "assets/images/profile.png";

  // Other Constants
  static const Duration locationUpdateInterval = Duration(seconds: 5);


  static const String baseHost = "192.168.29.111";
  static const String baseApiPath = "api";
  static const String servicePort = "8080";

  // Endpoints
  static const String registerEndpoint = 'register';
  static const String loginEndpoint = 'login';
  static const String empDataEndpoint = '';
  static const String officeLocationEndpoint = 'emp';
  static const String checkInEndpoint = 'checkIn';
  static const String checkOutEndpoint = 'checkOut';
  static const String statusEndpoint = 'status';

  static String getBaseUrl(String service) {
    return 'http://$baseHost:$servicePort/$baseApiPath/$service';
  }

  static String getEndpoint(String service, String endpoint, {String? pathParams}) {
    final baseUrl = getBaseUrl(service);
    return pathParams != null ? '$baseUrl/$endpoint/$pathParams' : '$baseUrl/$endpoint';
  }
}
