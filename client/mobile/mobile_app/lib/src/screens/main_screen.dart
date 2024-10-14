import 'package:flutter/material.dart';

import '../widgets/navigation_menu.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      bottomNavigationBar: NavigationMenu(),
    );
  }
}
