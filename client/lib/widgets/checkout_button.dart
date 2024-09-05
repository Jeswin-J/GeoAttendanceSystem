import 'package:client/screens/home_page.dart';
import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'package:latlong2/latlong.dart';

class CheckoutButton extends StatelessWidget {
  final LatLng? currentPosition;

  CheckoutButton({Key? key, this.currentPosition}) : super(key: key);

  Future<void> _checkOut(BuildContext context) async {
    if (currentPosition == null) {
      print('Current position is null');
      return;
    }

    try {
      final response = await ApiService.checkOut(
        employeeId: 1,
        latitude: currentPosition!.latitude,
        longitude: currentPosition!.longitude,
      );

      if (response.statusCode == 200) {
        print('Check-out successful');
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => const MyHomePage(),
          ),
        );
      } else {
        print('Failed to check out: ${response.body}');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => _checkOut(context),
      child: const Text('Check Out'),
    );
  }
}
