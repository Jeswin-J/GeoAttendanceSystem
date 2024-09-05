import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import '../widgets/checkin_button.dart';
import '../services/location_service.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  LatLng? _currentPosition;
  final MapController _mapController = MapController();

  @override
  void initState() {
    super.initState();
    _determinePosition();
  }

  Future<void> _determinePosition() async {
    try {
      Position position = await LocationService.getCurrentPosition();
      setState(() {
        _currentPosition = LatLng(position.latitude, position.longitude);
      });
    } catch (e) {
      // Handle the error
      print('Error: $e');
    }
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
                  CircleMarker(
                    point: _currentPosition!,
                    radius: 200,
                    useRadiusInMeter: true,
                    color: Colors.lightBlueAccent.withOpacity(0.3),
                    borderStrokeWidth: 2,
                    borderColor: Colors.lightBlueAccent,
                  ),
                ]),
              if (_currentPosition != null)
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
                            offset: Offset(0, 4),
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
                if (_currentPosition != null) {
                  _mapController.move(_currentPosition!, 15);
                }
              },
              child: const Icon(Icons.my_location),
            ),
          ),
          Positioned(
            bottom: 80,
            left: 0,
            right: 0,
            child: Align(
              alignment: Alignment.bottomCenter,
              child: CheckinButton(currentPosition: _currentPosition),
            ),
          ),
        ],
      ),
    );
  }
}
