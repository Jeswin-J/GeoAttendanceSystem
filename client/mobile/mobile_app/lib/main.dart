import 'dart:async';
import 'package:app_settings/app_settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:location/location.dart';
import 'package:mobile_app/src/screens/auth/login_screen.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
FlutterLocalNotificationsPlugin();


void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {


  final Location location = Location();
  LocationData? currentLocation;

  @override
  void initState() {
    super.initState();
    _fetchLocation();
  }

  Future<void> _fetchLocation() async {
    try {
      // Check if location service is enabled
      bool serviceEnabled = await location.serviceEnabled();
      if (!serviceEnabled) {
        serviceEnabled = await location.requestService();
        if (!serviceEnabled) {
          print("Location service is disabled.");
          return;
        }
      }

      // Check foreground location permission
      PermissionStatus permissionGranted = await location.hasPermission();
      if (permissionGranted == PermissionStatus.denied) {
        permissionGranted = await location.requestPermission();
        if (permissionGranted != PermissionStatus.granted) {
          print("Foreground location permission not granted.");
          return;
        }
      }

      // Check background location permission
      if (permissionGranted == PermissionStatus.granted) {
        PermissionStatus backgroundPermissionGranted =
        await location.requestPermission();

        if (backgroundPermissionGranted != PermissionStatus.granted) {
          print("Background location permission not granted.");
          _showPermissionDialog(); // Ask user to enable it in settings
          return;
        }
      }

      // Request high accuracy for better results
      await location.changeSettings(accuracy: LocationAccuracy.high);
      await location.enableBackgroundMode(enable: true);

      location.changeNotificationOptions(
        title: 'Geolocation',
        subtitle: 'Tracking your location in the background',
      );

      // Fetch current location
      currentLocation = await location.getLocation();
      if (currentLocation != null) {
        print(
            "Location fetched: Latitude: ${currentLocation!.latitude}, Longitude: ${currentLocation!.longitude}");
      } else {
        print("Failed to fetch location.");
      }
    } catch (e) {
      print("Error fetching location: $e");
    }
  }



  void _showPermissionDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Permission Required'),
          content: const Text(
              'Background location permission is required to track attendance. Please enable it in the app settings.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                AppSettings.openAppSettings(); // Open app settings
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Open Settings'),
            ),
          ],
        );
      },
    );
  }





  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.light,
    ));
    return MaterialApp(
      title: 'Attendance Tracking App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const SafeArea(child: LoginScreen()),
      debugShowCheckedModeBanner: false,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en', ''), // English
        Locale('hi', ''), // Hindi
      ],
    );
  }
}
