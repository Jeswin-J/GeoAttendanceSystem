import 'package:flutter/material.dart';

import '../../services/api_service.dart';
import '../../widgets/button.dart';
import 'login_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  String? _password;
  String? _confirmPassword;
  String? _activationCode;

  final APIService _apiService = APIService();

  void _navigateToLogin() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
    );
  }

  Future<void> _authenticateUser() async {
    if (_formKey.currentState!.validate()) {
      bool success = await _apiService.registerUser(
          _activationCode!, _password!);
      if (success) {
        _navigateToLogin();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Registration failed")),
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
                  'Sign Up',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 32),
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Activation Code',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.code),
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter your activation code';
                          }
                          return null;
                        },
                        onChanged: (value) {
                          _activationCode = value;
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
                      const SizedBox(height: 16),
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Confirm Password',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.lock),
                        ),
                        obscureText: true,
                        validator: (value) {
                          if (value != _password) {
                            return 'Passwords do not match';
                          }
                          return null;
                        },
                        onChanged: (value) {
                          _confirmPassword = value;
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
                        onTap: _navigateToLogin,
                        child: Text(
                          "Login Instead?",
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
