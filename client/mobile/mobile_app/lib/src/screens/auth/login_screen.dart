import 'package:flutter/material.dart';
import 'package:mobile_app/src/utils/helper.dart';
import 'package:shared_preferences/shared_preferences.dart';
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
  bool _isLoading = false;

  final APIService _apiService = APIService();
  final AppUtils _appUtils = AppUtils();

  @override
  void initState() {
    super.initState();
    _checkForStoredEmployeeData();
  }

  Future<void> _checkForStoredEmployeeData() async {
    final prefs = await SharedPreferences.getInstance();
    final employeeData = prefs.getString('employeeData');
    if (employeeData != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const SafeArea(child: MainScreen()),
        ),
      );
    }
  }

  void _navigateToSignUp() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const RegisterScreen()),
    );
  }

  Future<void> _authenticateUser() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    try {
      // Attempt to log in the user
      final loginResponse = await _apiService.login(_employeeId!, _password!);

      if (loginResponse != null && loginResponse['success'] == true) {
        // Fetch employee data after successful login
        final employeeData = await _apiService.fetchEmployeeData(_employeeId!);

        if (employeeData != null) {
          // Navigate to the main screen on successful data retrieval
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => const SafeArea(child: MainScreen()),
            ),
          );
        } else {
          _showSnackBar('Failed to fetch employee data.');
        }
      } else {
        _showSnackBar(
          loginResponse != null ? loginResponse['message'] : 'Login failed',
        );
      }
    } catch (e) {
      _showSnackBar('An error occurred. Please try again.');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }


  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
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
                      if (_isLoading)
                        const CircularProgressIndicator()
                      else
                        Button(
                          text: "Authenticate",
                          onPressed: _authenticateUser,
                          backgroundColor: Colors.blue.shade800,
                          textColor: Colors.white,
                          fontSize: 18,
                          borderRadius: 10,
                          elevation: 4,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 40,
                            vertical: 10,
                          ),
                        ),
                      const SizedBox(height: 16),
                      GestureDetector(
                        onTap: _navigateToSignUp,
                        child: Text(
                          "New User?",
                          style: TextStyle(
                            color: Colors.blue.shade800,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
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
