import 'package:flutter/material.dart';
import '../../widgets/button.dart';
import '../../widgets/leave_stats.dart';

class AttendanceScreen extends StatelessWidget {
  const AttendanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blueGrey.shade50,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0), // Consistent side padding
        child: Column(
          children: [
            // Leave Stats Title aligned to the left
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Leave Stats',
                  style: TextStyle(
                    fontSize: 20, // Font size for the title
                    color: Colors.blueGrey[900],
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            // Leave Stats Card
            const LeaveStatsCard(
              leaveStats: {
                'Available': '10',
                'Approved': '5',
                'Pending': '2',
                'Applied': '12',
                'Rejected': '1',
                'Total Leave': '20',
              },
            ),
            const SizedBox(height: 20), // Add space below the card

            // Attendance Logs Title
            Text(
              'Attendance Logs',
              style: TextStyle(
                fontSize: 20, // Font size for the title
                color: Colors.blueGrey[900],
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16), // Add space below the title

            // Request Leave Button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Button(
                    text: "Request Leave",
                    onPressed: () {
                      print("Availing Leave...");
                    },
                    backgroundColor: Colors.blue.shade800,
                    textColor: Colors.white,
                    fontSize: 18,
                    borderRadius: 10,
                    elevation: 4,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
