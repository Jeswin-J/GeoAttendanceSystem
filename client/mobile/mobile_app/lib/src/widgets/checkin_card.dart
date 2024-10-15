import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart'; // Import flutter_map package
import 'package:latlong2/latlong.dart'; // Import for LatLng class

class CheckInCard extends StatefulWidget {
  final String status;
  final String location;
  final String address;
  final double latitude;
  final double longitude;
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
  _CheckInCardState createState() => _CheckInCardState();
}

class _CheckInCardState extends State<CheckInCard> {
  late final MapController _mapController;
  double _zoomLevel = 5.0; // Start with a lower zoom level

  @override
  void initState() {
    super.initState();
    _mapController = MapController();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _animateZoom();
    });
  }

  // Method to animate zoom after the map is rendered
  void _animateZoom() {
    Future.delayed(const Duration(milliseconds: 500), () {
      _mapController.move(LatLng(widget.latitude, widget.longitude), 15); // Zoom to 15 after map is loaded
    });
  }

  @override
  Widget build(BuildContext context) {
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
                widget.status,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue[800],
                ),
              ),
              const SizedBox(height: 16),

              // Flutter Map Widget with MapController for animation
              SizedBox(
                height: 300, // Set a fixed height for the map
                width: double.infinity,
                child: FlutterMap(
                  mapController: _mapController, // Pass the MapController
                  options: MapOptions(
                    initialCenter: LatLng(widget.latitude, widget.longitude),
                    initialZoom: _zoomLevel, // Set initial zoom level
                    onMapReady: _animateZoom, // Call zoom animation when map is ready
                  ),
                  children: [
                    TileLayer(
                      urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.example.app',
                    ),
                    CircleLayer(
                      circles: [
                        CircleMarker(
                          point: LatLng(widget.latitude, widget.longitude),
                          radius: 500,
                          useRadiusInMeter: true,
                          color: Colors.blue.withOpacity(0.2),
                          borderStrokeWidth: 0.5,
                          borderColor: Colors.blue
                        ),
                      ],
                    ),
                    MarkerLayer(
                      markers: [
                        Marker(
                          point: LatLng(widget.latitude, widget.longitude),
                          child: Icon(
                            Icons.location_on,
                            color: Colors.red[900],
                            size: 30,
                          ),
                        ),
                      ],
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
                    widget.location,
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
                "${widget.latitude}, ${widget.longitude}",
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                widget.address,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.grey,
                ),
              ),

              if (widget.actions.isNotEmpty)
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: widget.actions,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
