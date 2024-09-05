import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../services/api_service.dart';
import 'package:latlong2/latlong.dart';
import '../screens/checkin_success_page.dart';

class CheckinButton extends StatelessWidget {
  final LatLng? currentPosition;

  const CheckinButton({super.key, this.currentPosition});

  Future<void> _checkIn(BuildContext context) async {
    if (currentPosition == null) {
      print('Current position is null');
      return;
    }

    try {
      final response = await ApiService.checkIn(
        employeeId: 1, // Replace with actual employee ID
        latitude: currentPosition!.latitude,
        longitude: currentPosition!.longitude,
        locationDescription: 'Current Location',
      );

      if (response.statusCode == 200) {
        print('Check-in successful');
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => CheckinSuccessPage(
              employeeId: 1, // Replace with actual employee ID
              latitude: currentPosition!.latitude,
              longitude: currentPosition!.longitude,
              timestamp: DateTime.now().toIso8601String(),
            ),
          ),
        );
      } else {
        print('Failed to check in: ${response.body}');
        // Optionally, show an error message
      }
    } catch (e) {
      print('Error: $e');
      // Optionally, show an error message
    }
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        textStyle: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 54, vertical: 12),
        elevation: 4,
      ),
      onPressed: () async {
        await _checkIn(context);
      },
      child: const Text('Check In'),
    );
  }
}
