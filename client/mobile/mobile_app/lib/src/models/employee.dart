class Employee {
  final int id;
  final String employeeId;
  final String name;
  final String role;
  final String department;

  Employee({
    required this.id,
    required this.employeeId,
    required this.name,
    required this.role,
    required this.department,
  });

  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      id: json['id'],
      employeeId: json['employeeId'],
      name: json['name'],
      role: json['role'],
      department: json['department'],
    );
  }
}