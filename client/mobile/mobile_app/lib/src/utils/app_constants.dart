class AppConstants {
  static const String baseHost = "192.168.29.111";
  static const String baseApiPath = "api";

  // Service Ports
  static const Map<String, String> servicePorts = {
    'auth': "8080",
    'attendance': "8081",
  };

  // Endpoints
  static const String statusEndpoint = 'status/E4';
  static const String registerEndpoint = 'register';
  static const String loginEndpoint = 'login';

  static String getBaseUrl(String service) {
    final port = servicePorts[service];
    return port != null ? 'http://$baseHost:$port/$baseApiPath/$service' : '';
  }

  static String getEndpoint(String service, String endpoint) {
    return '${getBaseUrl(service)}/$endpoint';
  }
}
