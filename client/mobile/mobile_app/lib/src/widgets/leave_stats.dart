import 'package:flutter/material.dart';

class LeaveStatsCard extends StatelessWidget {
  final Map<String, String> leaveStats;

  const LeaveStatsCard({super.key, required this.leaveStats});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0), // Reduced vertical padding
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start, // Align the title to the left
          children: [
            GridView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(), // Prevent scrolling in the grid
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                childAspectRatio: 1.2, // Increased aspect ratio to make the cells more rectangular
                crossAxisSpacing: 15,
                mainAxisSpacing: 0,
              ),
              itemCount: leaveStats.length,
              itemBuilder: (context, index) {
                String key = leaveStats.keys.elementAt(index);
                String value = leaveStats[key]!;

                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      value,
                      style: const TextStyle(
                        fontSize: 24, // Reduced font size for values
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      key,
                      style: TextStyle(
                        fontSize: 14, // Reduced font size for key labels
                        color: Colors.grey[600],
                        fontWeight: FontWeight.bold
                      ),
                    ),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
