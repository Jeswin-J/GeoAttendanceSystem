import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GeoAttendance',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  LatLng? _currentPosition;
  final MapController _mapController = MapController();
  // bool _mapInitialized = false;

  @override
  void initState() {
    super.initState();
    _determinePosition();
  }

  Future<void> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Check if location services are enabled
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled, request user to enable it
      return Future.error('Location services are disabled.');
    }

    // Check for location permissions
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied, handle appropriately
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    // Get the current position
    Position position = await Geolocator.getCurrentPosition();
    setState(() {
      _currentPosition = LatLng(position.latitude, position.longitude);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("GeoAttendance", style: TextStyle(fontSize: 22)),
      ),
      body: Stack(
        children: [
          FlutterMap(
            options: MapOptions(
              initialCenter: _currentPosition!,
              initialZoom: 15,
              interactionOptions: const InteractionOptions(
                flags: InteractiveFlag.all,
              ),
            ),
            mapController: _mapController,
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'dev.fleaflet.flutter_map.example',
              ),
              if (_currentPosition != null)
                CircleLayer(circles: [
                  CircleMarker(point: _currentPosition!,
                      radius: 200,
                      useRadiusInMeter: true,
                      color: Colors.lightBlueAccent.withOpacity(0.3),
                      borderStrokeWidth: 2,
                      borderColor: Colors.lightBlueAccent,
                  ),
                ]),
                MarkerLayer(
                  markers: [
                    Marker(
                      width: 150.0,
                      height: 150.0,
                      point: _currentPosition!,
                      child: const Icon(
                        Icons.location_on,
                        color: Colors.red,
                        size: 40.0,
                        shadows: [
                          BoxShadow(
                            color: Colors.black,
                            blurStyle: BlurStyle.normal,
                            spreadRadius: 2,
                            blurRadius: 8,
                            offset: Offset(0, 4), // changes position of shadow
                          ),
                        ],
                      ),
                    ),
                  ],
                )
            ],
          ),
          Positioned(
            bottom: 20,
            right: 20,
            child: FloatingActionButton(
              onPressed: () {
                  _mapController.move(_currentPosition!, 15); // Move the map to current position
              },
              child: const Icon(Icons.my_location),
            ),
          ),
          const Positioned(
            bottom: 80,
            left: 0,
            right: 0,
            child: Align(
              alignment: Alignment.bottomCenter,
              child: CheckinButton(),
            ),
          ),
        ],
      ),
    );
  }
}

class CheckinButton extends StatelessWidget {
  const CheckinButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        textStyle: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
        backgroundColor: Colors.blue, // Background color
        foregroundColor: Colors.white, // Text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12), // Button border radius
        ),
        padding: const EdgeInsets.symmetric(horizontal: 54, vertical: 12), // Button padding
        elevation: 4, // Button elevation (shadow)
      ),
      onPressed: () {
        print('Check In');
      },
      child: const Text('Check In'),
    );
  }
}
