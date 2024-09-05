import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import '../widgets/checkout_button.dart'; 

class CheckinSuccessPage extends StatelessWidget {
  final int employeeId;
  final double latitude;
  final double longitude;
  final String timestamp;
  final LatLng currentPosition;

  const CheckinSuccessPage({
    super.key,
    required this.employeeId,
    required this.latitude,
    required this.longitude,
    required this.timestamp,
    required this.currentPosition,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Check-in Success"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Check-in Successful!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.green,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Employee ID: $employeeId',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 10),
            Text(
              'Latitude: $latitude',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 10),
            Text(
              'Longitude: $longitude',
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 10),
            Text(
              'Timestamp: $timestamp',
              style: const TextStyle(fontSize: 18),
            ),
            const Spacer(), // Pushes the button to the bottom
            Align(
              alignment: Alignment.bottomCenter,
              child: CheckoutButton(currentPosition: currentPosition), // Ensure you pass currentPosition
            ),
          ],
        ),
      ),
    );
  }
}
