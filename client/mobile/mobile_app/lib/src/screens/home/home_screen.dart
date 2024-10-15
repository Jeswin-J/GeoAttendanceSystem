import 'dart:async'; // Import to use Timer
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/src/widgets/checkin_card.dart';
import 'package:mobile_app/src/widgets/welcome_card.dart';
import 'package:geolocator/geolocator.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late String formattedDate;
  late String formattedTime;
  late Timer timer;
  String _address = "";
  String _latitude = "";
  String _longitude = "";
  static const Duration locationUpdateInterval = Duration(seconds: 5); // Update every 5 seconds

  @override
  void initState() {
    super.initState();
    _updateTime();
    timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _updateTime());
    _initializeLocation(); // Initialize with cached location
    Timer.periodic(locationUpdateInterval, (Timer t) => _getCurrentLocation()); // Dynamic location updates
  }

  void _updateTime() {
    DateTime now = DateTime.now();
    setState(() {
      formattedDate = DateFormat('MMM d, yyyy').format(now);
      formattedTime = DateFormat('hh:mm').format(now);
    });
  }

  Future<void> _initializeLocation() async {
    // Get the last known position
    Position? lastPosition = await Geolocator.getLastKnownPosition();
    if (lastPosition != null) {
      setState(() {
        _latitude = "${lastPosition.latitude}";
        _longitude = "${lastPosition.longitude}";
        _address = "No 101A, Ohm Sakthi Nagar, II Cross Street, Mangadu, Chennai - 600122"; // Can be updated later
      });
    }
    // Fetch the current location after initializing with the last known position
    await _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    if (permission == LocationPermission.deniedForever) {
      // Check if the widget is still mounted before calling setState
      if (mounted) {
        setState(() {
          _address = "Location permissions are permanently denied.";
        });
      }
      return;
    }

    try {
      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);

      if (mounted) {
        setState(() {
          print(position);
          _latitude = "${position.latitude}";
          _longitude = "${position.longitude}";
          _address = "No 101A, Ohm Sakthi Nagar, II Cross Street, Mangadu, Chennai - 600122"; // Update with reverse geocoding if needed
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


  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.only(left: 25.0),
          child: Icon(
            Icons.gps_fixed,
            color: Colors.blue[900],
          ),
        ),
        title: Text(AppLocalizations.of(context)!.title),
        elevation: 0,
        backgroundColor: Colors.white10,
      ),
      body: Column(
        children: [
          WelcomeCard(
            empName: "Jeswin Joseph J 👋🏼",
            date: formattedDate,
            time: "$formattedTime PM [IST]",
            profileImagePath: "assets/images/profile.png",
          ),
          CheckInCard(
            status: "Check-In",
            location: "GAIL Office, Delhi",
            address: _address,
            latitude: _latitude,
            longitude: _longitude,
          ),
        ],
      ),
    );
  }
}
