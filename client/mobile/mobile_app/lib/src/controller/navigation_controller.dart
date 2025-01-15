import 'package:get/get.dart';
import 'package:mobile_app/src/screens/home/home_screen.dart';
import 'package:mobile_app/src/screens/profile/profile_screen.dart';
import 'package:mobile_app/src/screens/settings/settings_screen.dart';

class NavigationController extends GetxController {
  final Rx<int> selectedIndex = 0.obs;

  final screens = [
    const HomeScreen(),
    const SettingsScreen(),
    const ProfileScreen(),
  ];
}
