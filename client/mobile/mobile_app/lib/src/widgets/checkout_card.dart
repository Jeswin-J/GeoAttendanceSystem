import 'dart:async';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class CheckoutCard extends StatefulWidget {
  final String status;
  final String location;
  final String address;
  final double latitude;
  final double longitude;
  final List<Widget> actions;
  final String checkInTime; // Accept timestamp as a string

  const CheckoutCard({
    super.key,
    required this.status,
    required this.location,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.checkInTime, // Pass the timestamp string
    this.actions = const [],
  });

  @override
  _CheckoutCardState createState() => _CheckoutCardState();
}

class _CheckoutCardState extends State<CheckoutCard> {
  late Timer _timer;
  late DateTime _checkInDateTime; // Parsed DateTime from string
  int _secondsElapsed = 0;

  @override
  void initState() {
    super.initState();
    _checkInDateTime = DateTime.parse(widget.checkInTime); // Parse the string
    _secondsElapsed = _calculateInitialElapsedTime();
    _startTimer();
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _secondsElapsed++;
      });
    });
  }

  int _calculateInitialElapsedTime() {
    final now = DateTime.now();
    return now.difference(_checkInDateTime).inSeconds;
  }

  String _formatDuration(int seconds) {
    int hours = seconds ~/ 3600;
    int minutes = (seconds % 3600) ~/ 60;
    int remainingSeconds = seconds % 60;

    return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: SizedBox(
        width: double.infinity, // Take full width
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
                Lottie.asset(
                  'assets/animations/work_animation.json',
                  height: 250,
                ),
                Text(
                  "Time Elapsed",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[800],
                  ),
                ),
                Text(
                  _formatDuration(_secondsElapsed),
                  style: TextStyle(
                    fontSize: 38,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue[800],
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.gps_fixed,
                      color: Colors.blue[800],
                      size: 20,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      widget.location,
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.black87,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
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
      ),
    );
  }
}
