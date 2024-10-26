import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/src/utils/helper.dart';
import 'package:mobile_app/src/widgets/button.dart';
import 'package:mobile_app/src/widgets/checkin_card.dart';
import 'package:mobile_app/src/widgets/checkout_card.dart';
import 'package:mobile_app/src/widgets/welcome_card.dart';

import '../../models/attendance_request.dart';
import '../../models/status_request.dart';
import '../../services/api_service.dart';
import '../../utils/app_constants.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final APIService apiService = APIService();

  late String formattedDate;
  late String formattedTime;
  late Timer timer;
  String _address = "";
  double _latitude = 0.0;
  double _longitude = 0.0;
  static const Duration locationUpdateInterval =
  Duration(seconds: 5); //TODO: UPDATE FREQUENCY AS REQUIRED

  StatusRequest? _attendanceData;

  bool _isCheckedIn = false;

  @override
  void initState() {
    super.initState();

    _fetchAttendanceDataOnStart();
    _updateTime();
    timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _updateTime());
    _initializeLocation();
    Timer.periodic(locationUpdateInterval, (Timer t) => _getCurrentLocation());
  }

  Future<void> _fetchAttendanceDataOnStart() async {
    final attendanceData = await apiService.fetchData(
      AppConstants.statusEndpoint,
          (json) => StatusRequest.fromJson(json),
    );

    if (attendanceData != null) {
      setState(() {
        _attendanceData = attendanceData;
        _isCheckedIn = _attendanceData!.checkOutTimeStamp == null;
      });
      print("SUCCESS: Attendance Data vanthuduchi!");
    } else {
      print("ERROR: Attendance Data varla!");
    }
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
        _address =
        "No 101A, Ohm Sakthi Nagar, II Cross Street, Mangadu, Chennai - 600122";
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
          _address =
          "No 101A, Ohm Sakthi Nagar, II Cross Street, Mangadu, Chennai - 600122";
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


  void toggleCheckInOut() async {
    String endpoint = _isCheckedIn ? "checkOut" : "checkIn";

  var requestBody = {
      "employeeId": "E2",
      "location": {
        "latitude": _latitude,
        "longitude": _longitude,
        "accuracy": 0.9999,
      },
    };

    AttendanceRequest request = AttendanceRequest.fromJson(requestBody);

    final response = await apiService.postData(
      endpoint,
      request,
          (json) => json,
    );

    if (response != null) {
      setState(() {
        _isCheckedIn = !_isCheckedIn;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error during ${_isCheckedIn ? "Check-Out" : "Check-In"}"),
          )
        );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
              "Error during ${_isCheckedIn ? "Check-Out" : "Check-In"}"),
        ),
      );
    }
  }



  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_attendanceData == null) {
      return const Center(
          child: CircularProgressIndicator());
    }

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
      body: Column(
        children: [
          WelcomeCard(
            empName:
            "${_attendanceData?.employee.name} 👋🏼",
            date: formattedDate,
            time: formattedTime,
            profileImagePath: "assets/images/profile.png",
          ),
          !_isCheckedIn
              ? CheckInCard(
            status: "Check-In",
            location: "GAIL Office, Delhi",
            address: _address,
            latitude: _latitude,
            longitude: _longitude,
          )
              : CheckoutCard(
            checkInTime: _attendanceData!.checkInTimeStamp,
            status: "Check-Out",
            location: "GAIL Office, Delhi",
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
                  bool confirmed = await showConfirmationDialog(
                    context,
                    title: 'Confirm Action',
                    message: 'Are you sure you want to Check-In?',
                    confirmText: 'Yes',
                    cancelText: 'No',
                  );

                  if (confirmed) {
                    toggleCheckInOut();
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
                        bool confirmed = await showConfirmationDialog(
                          context,
                          title: 'Confirm Action',
                          message: 'Are you sure you want to Check-Out?',
                          confirmText: 'Yes',
                          cancelText: 'No',
                        );

                        if (confirmed) {
                          toggleCheckInOut();
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