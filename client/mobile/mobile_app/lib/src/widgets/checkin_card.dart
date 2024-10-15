import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart'; // Import flutter_map package
import 'package:latlong2/latlong.dart'; // Import for LatLng class

class CheckInCard extends StatelessWidget {
  final String status;
  final String location;
  final String address;
  final String latitude;
  final String longitude;
  final List<Widget> actions;

  const CheckInCard({
    super.key,
    required this.status,
    required this.location,
    required this.address,
    required this.latitude,
    required this.longitude,
    this.actions = const [],
  });

  @override
  Widget build(BuildContext context) {
    // Parse latitude and longitude from string to double
    final double lat = double.tryParse(latitude) ?? 0.0;
    final double lng = double.tryParse(longitude) ?? 0.0;

    return Padding(
      padding: const EdgeInsets.only(right: 12.0, left: 12.0),
      child: Card(
        elevation: 1,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                status,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue[800],
                ),
              ),
              const SizedBox(height: 16),

              // Flutter Map Widget
              SizedBox(
                height: 300, // Set a fixed height for the map
                width: double.infinity,
                child: FlutterMap(
                  children: [
                    TileLayer(
                      urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.example.app',
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.gps_fixed,
                    color: Colors.blue[900],
                  ),
                  const SizedBox(width: 8),
                  Text(
                    location,
                    style: const TextStyle(
                      fontSize: 18,
                      color: Colors.black87,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                "$latitude, $longitude",
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                address,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                ),
              ),

              if (actions.isNotEmpty)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: actions,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
