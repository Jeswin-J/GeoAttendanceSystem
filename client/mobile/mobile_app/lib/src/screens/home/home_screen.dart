import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.title),
        backgroundColor: Colors.blueGrey,
        elevation: 4.0,
        actions: [

        ],
      ),
      body: Center(
        child: Text(AppLocalizations.of(context)!.title),
      ),
    );
  }
}
