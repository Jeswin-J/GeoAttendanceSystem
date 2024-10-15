import 'package:flutter/material.dart';

class WelcomeCard extends StatelessWidget {
  final String title;
  final String date;
  final String time;
  final List<Widget> actions;

  const WelcomeCard({
    super.key,
    required this.title,
    required this.date,
    required this.time,
    this.actions = const [],
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Card(
        elevation: 1,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(
                    Icons.calendar_month,
                    color: Color(0xFF474747),
                  ),
                  const SizedBox(width: 8), // Space between icon and date
                  Text(
                    date,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF474747),
                    ),
                  ),
                  const SizedBox(width: 16), // Space between date and time icon
                  const Icon(
                    Icons.access_time_outlined,
                    color: Color(0xFF474747),
                  ),
                  const SizedBox(width: 8), // Space between icon and time
                  Text(
                    time,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF474747),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              if (actions.isNotEmpty)
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: actions,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
