class AppConstants {
  static const String baseHost = "192.168.29.111";
  static const String baseApiPath = "api";
  static const String servicePort = "8080";

  // Endpoints
  static const String statusEndpoint = 'status/EMP4';
  static const String registerEndpoint = 'register';
  static const String loginEndpoint = 'login';

  static String getBaseUrl(String service) {
    return 'http://$baseHost:$servicePort/$baseApiPath/$service';
  }

  static String getEndpoint(String service, String endpoint) {
    return '${getBaseUrl(service)}/$endpoint';
  }
}
