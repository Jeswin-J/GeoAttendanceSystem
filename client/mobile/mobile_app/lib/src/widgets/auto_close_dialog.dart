import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class AutoCloseDialog extends StatelessWidget {
  final String lottieFile;
  final String message;
  final BuildContext context;
  final int durationSeconds;
  final bool isSuccess;

  const AutoCloseDialog({
    required this.lottieFile,
    required this.message,
    required this.context,
    required this.isSuccess,
    this.durationSeconds = 3,
    Key? key,
  }) : super(key: key);

  void _startAutoCloseTimer() {
    Timer(Duration(seconds: durationSeconds), () {
      if (Navigator.of(context).canPop()) {
        Navigator.of(context).pop(); // Close the dialog automatically
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    _startAutoCloseTimer();

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Lottie.asset(
            lottieFile,
            width: 100,
            height: 100,
            repeat: false,
          ),
          Text(
            message,
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: 18,
                color: isSuccess ? Colors.green.shade600 : Colors.red.shade600,
                fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
