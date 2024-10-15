import 'dart:async'; // Import to use Timer
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/src/widgets/welcome_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late String formattedDate;
  late String formattedTime;
  late Timer timer;

  @override
  void initState() {
    super.initState();
    _updateTime();
    timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _updateTime());
  }

  void _updateTime() {
    DateTime now = DateTime.now();
    setState(() {
      formattedDate = DateFormat('MMM d, yyyy').format(now);
      formattedTime = DateFormat('hh:mm').format(now);
    });
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const Padding(
          padding: EdgeInsets.only(left: 25.0),
          child: Icon(
            Icons.gps_fixed,
            color: Colors.blueAccent,
          ),
        ),
        title: Text(AppLocalizations.of(context)!.title),
        elevation: 0,
        backgroundColor: Colors.white10,
      ),
      body: Column(
        children: [
          WelcomeCard(
            title: "Employee",
            date: formattedDate,
            time: "$formattedTime PM [IST]",
          ),
        ],
      ),
    );
  }
}
