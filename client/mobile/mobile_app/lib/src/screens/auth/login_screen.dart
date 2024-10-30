import 'package:flutter/material.dart';
import 'package:mobile_app/src/screens/auth/register_screen.dart';

import '../../services/api_service.dart';
import '../../widgets/button.dart';
import '../main_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String? _employeeId;
  String? _password;

  final APIService _apiService = APIService();

  void _navigateToSignUp() {
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => const RegisterScreen()));
  }

  Future<void> _authenticateUser() async {
    if (_formKey.currentState!.validate()) {
      final response = await _apiService.login(
        _employeeId!,
        _password!,
            (json) => json,
      );

      print(response);

      if (response != null && response['success'] == true) {
        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => const SafeArea(child: MainScreen())));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(response != null ? response['message'] : 'Login failed')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey.shade50,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  "assets/images/gail_logo.png",
                  width: 200,
                  alignment: Alignment.center,
                ),
                const SizedBox(height: 60),
                const Text(
                  'Sign In',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 32),
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Employee ID',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.perm_identity),
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter your Employee ID';
                          }
                          return null;
                        },
                        onChanged: (value) {
                          _employeeId = value;
                        },
                      ),
                      const SizedBox(height: 16),
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Password',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.lock),
                        ),
                        obscureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter your password';
                          }
                          return null;
                        },
                        onChanged: (value) {
                          _password = value;
                        },
                      ),
                      const SizedBox(height: 20),
                      Button(
                        text: "Authenticate",
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            _authenticateUser();
                          }
                        },
                        backgroundColor: Colors.blue.shade800,
                        textColor: Colors.white,
                        fontSize: 18,
                        borderRadius: 10,
                        elevation: 4,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 40, vertical: 10),
                      ),
                      const SizedBox(height: 16),
                      GestureDetector(
                        onTap: _navigateToSignUp,
                        child: Text(
                          "New User?",
                          style: TextStyle(
                              color: Colors.blue.shade800,
                              fontSize: 16,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
