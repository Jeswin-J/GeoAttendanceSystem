import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../services/api_service.dart';
import '../widgets/confirmation_model.dart';

class AppUtils{

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  Future<void> storeToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('jwt_token', token);
  }

  Future<void> storeEmployeeData(Map<String, dynamic> employeeData) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('employeeData', jsonEncode(employeeData));
  }


  Future<Map<String, dynamic>?> getStoredEmployeeData() async {
    final prefs = await SharedPreferences.getInstance();
    final employeeData = prefs.getString('employeeData');
    if (employeeData != null) {
      return jsonDecode(employeeData);
    }
    return null;
  }


  Future<bool> showConfirmationDialog(BuildContext context, {
    required String title,
    required String message,
    String confirmText = 'Confirm',
    String cancelText = 'Cancel',
  }) {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return ConfirmationDialog(
          title: title,
          message: message,
          confirmText: confirmText,
          cancelText: cancelText,
        );
      },
    ).then((value) => value ?? false);
  }


  Future<void> checkProximityAndPerformActions(String employeeId, double officeLat, double officeLong, double radius) async {
    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);

    double distance = Geolocator.distanceBetween(
      position.latitude,
      position.longitude,
      officeLat,
      officeLong,
    );

    DateTime now = DateTime.now();

    if (distance <= radius) {
      if (now.hour >= 8 && now.hour <= 10) {
        // Automatic Check-In
        await APIService().sendAttendanceRequest(
          employeeId,
          "checkIn",
          position.latitude,
          position.longitude,
        );
        print("Automatic Check-In Performed");
      }
    } else {
      if (now.hour >= 17) {
        // Automatic Check-Out
        await APIService().sendAttendanceRequest(
          employeeId,
          "checkOut",
          position.latitude,
          position.longitude,
        );
        print("Automatic Check-Out Performed");
      }
    }
  }

}
