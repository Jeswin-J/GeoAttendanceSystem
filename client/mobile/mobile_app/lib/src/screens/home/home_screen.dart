import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/src/services/api_service.dart';
import 'package:mobile_app/src/utils/helper.dart';
import 'package:mobile_app/src/widgets/button.dart';
import 'package:mobile_app/src/widgets/checkin_card.dart';
import 'package:mobile_app/src/widgets/checkout_card.dart';
import 'package:mobile_app/src/widgets/welcome_card.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../utils/app_constants.dart';
import '../../widgets/auto_close_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AppUtils appUtils = AppUtils();
  final APIService apiService = APIService();

  late String formattedDate;
  late String formattedTime;
  late Timer timer;
  String _address = "";
  double _latitude = 0.0;
  double _longitude = 0.0;
  static const Duration locationUpdateInterval = Duration(seconds: 5); //TODO: UPDATE FREQUENCY AS REQUIRED

  static Map<String, dynamic> employee = {};
  static Map<String, dynamic>? location;
  static Map<String, dynamic>? attendance;

  bool _isCheckedIn = false;
  bool _isLoading = true; // Track loading state

  @override
  void initState() {
    super.initState();
    _updateTime();
    timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _updateTime());
    _initializeLocation();
    Timer.periodic(locationUpdateInterval, (Timer t) => _getCurrentLocation());
    _loadEmployeeData();
  }

  void _updateTime() {
    DateTime now = DateTime.now();
    setState(() {
      formattedDate = DateFormat('MMM d, yyyy').format(now);
      formattedTime = DateFormat('hh:mm a').format(now);
    });
  }

  Future<void> _initializeLocation() async {
    Position? lastPosition = await Geolocator.getLastKnownPosition();
    if (lastPosition != null) {
      setState(() {
        _latitude = lastPosition.latitude;
        _longitude = lastPosition.longitude;
        _address = "${location?['address']}";
      });
    }
    await _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    if (permission == LocationPermission.deniedForever) {
      if (mounted) {
        setState(() {
          _address = "Location permissions are permanently denied.";
        });
      }
      return;
    }

    try {
      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high);

      if (mounted) {
        setState(() {
          _latitude = position.latitude;
          _longitude = position.longitude;
          _address = "${location?['address']}";
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _address = "Unable to retrieve location.";
        });
      }
    }
  }

  Future<void> _loadEmployeeData() async {
    setState(() {
      _isLoading = true; // Start loading
    });

    final prefs = await SharedPreferences.getInstance();
    final employeeData = prefs.getString('employeeData');

    if (employeeData != null) {
      setState(() {
        employee = jsonDecode(employeeData);
      });

      location = await apiService.fetchLocationData(employee['employeeId']);
      attendance = await apiService.fetchAttendanceData(employee['employeeId']);

      if (attendance != null && attendance?['checkOutTimeStamp'] == null) {
        _isCheckedIn = true;
      }

      print("Location Data: $location");
      print("Attendance Data: $attendance");
    }

    setState(() {
      _isLoading = false; // Stop loading
    });
  }

  void _showAutoCloseDialog({required String lottieFile, required String message, required bool isSuccess}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AutoCloseDialog(
          lottieFile: lottieFile,
          message: message,
          context: context,
          isSuccess: isSuccess,
        );
      },
    );
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey.shade50,
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.only(left: 25.0),
          child: Icon(
            Icons.gps_fixed,
            color: Colors.blue[800],
          ),
        ),
        title: Text(
          AppLocalizations.of(context)!.title,
          style: const TextStyle(
              fontWeight: FontWeight.bold, color: Colors.black87),
        ),
        backgroundColor: Colors.transparent,
      ),
      body: _isLoading // Show loader if data is loading
          ? Center(
        child: CircularProgressIndicator(
          color: Colors.blue,
        ),
      )
          : Column(
        children: [
          WelcomeCard(
            empName: "${employee['firstName']} ${employee['lastName']} 👋🏼",
            date: formattedDate,
            time: formattedTime,
            profileImagePath: "assets/images/profile.png",
          ),
          !_isCheckedIn
              ? CheckInCard(
            status: "Check-In",
            location: "${location?['locationName']}",
            address: _address,
            latitude: _latitude,
            longitude: _longitude,
          )
              : CheckoutCard(
            checkInTime: attendance?['checkInTimeStamp'],
            status: "Check-Out",
            location: "${location?['locationName']}",
            address: _address,
            latitude: _latitude,
            longitude: _longitude,
          ),
          const SizedBox(height: 14),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: SizedBox(
              width: double.infinity,
              child: !_isCheckedIn
                  ? Button(
                text: "Check-In",
                onPressed: () async {
                  bool confirmed = await appUtils.showConfirmationDialog(
                    context,
                    title: 'Confirm Action',
                    message: 'Are you sure you want to Check-In?',
                    confirmText: 'Yes',
                    cancelText: 'No',
                  );

                  if (confirmed) {
                    print("Check-In confirmed");
                  }
                },
                backgroundColor: Colors.green.shade700,
                textColor: Colors.white,
                fontSize: 18,
                borderRadius: 10,
                elevation: 4,
              )
                  : Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Button(
                      text: "Take Break",
                      onPressed: () {
                        print("Taking a break");
                      },
                      backgroundColor: Colors.blue.shade800,
                      textColor: Colors.white,
                      fontSize: 18,
                      borderRadius: 10,
                      elevation: 4,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Button(
                      text: "Check-Out",
                      onPressed: () async {
                        bool confirmed = await appUtils.showConfirmationDialog(
                          context,
                          title: 'Confirm Action',
                          message: 'Are you sure you want to Check-Out?',
                          confirmText: 'Yes',
                          cancelText: 'No',
                        );

                        if (confirmed) {
                          print("Check-Out confirmed");
                        }
                      },
                      backgroundColor: Colors.red.shade700,
                      textColor: Colors.white,
                      fontSize: 18,
                      borderRadius: 10,
                      elevation: 4,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
