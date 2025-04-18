import 'package:flutter/material.dart';

class WelcomeCard extends StatelessWidget {
  final String empName;
  final String date;
  final String time;
  final String profileImagePath;
  final List<Widget> actions;

  const WelcomeCard({
    super.key,
    required this.empName,
    required this.date,
    required this.time,
    required this.profileImagePath,
    this.actions = const [],
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          const EdgeInsets.only(right: 12.0, left: 12.0, top: 6.0, bottom: 6.0),
      child: Card(
        elevation: 1,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  ClipOval(
                    child: Image.asset(
                      profileImagePath,
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          empName,
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            const Icon(
                              Icons.calendar_month,
                              color: Color(0xFF474747),
                              size: 20,
                            ),
                            const SizedBox(width: 2),
                            Flexible(
                              child: Text(
                                date,
                                style: const TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF474747),
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            const Icon(
                              Icons.access_time_outlined,
                              color: Color(0xFF474747),
                              size: 20,
                            ),
                            const SizedBox(width: 2),
                            Flexible(
                              child: Text(
                                time,
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF474747),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              if (actions.isNotEmpty) const SizedBox(height: 16),
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
