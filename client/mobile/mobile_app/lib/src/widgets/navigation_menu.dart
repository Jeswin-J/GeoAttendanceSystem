import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:mobile_app/src/controller/navigation_controller.dart';

class NavigationMenu extends StatelessWidget {
  const NavigationMenu({super.key});

  @override
  Widget build(BuildContext context) {

    final controller = Get.put(NavigationController());

    return Scaffold(
      bottomNavigationBar: Obx(
        () => NavigationBar(
          height: 80,
          elevation: 0,
          indicatorColor: Colors.blueAccent.withOpacity(0.1),
          selectedIndex: controller.selectedIndex.value,
          onDestinationSelected: (index) => controller.selectedIndex.value = index,
          destinations: [
            NavigationDestination(
              icon: const Icon(Iconsax.home),
              label: AppLocalizations.of(context)!.nav_home,
            ),
            NavigationDestination(
              icon: const Icon(Iconsax.receipt),
              label: AppLocalizations.of(context)!.nav_attendance,
            ),
            NavigationDestination(
              icon: const Icon(Iconsax.setting_24),
              label: AppLocalizations.of(context)!.nav_settings,
            ),
            NavigationDestination(
              icon: const Icon(Iconsax.user),
              label: AppLocalizations.of(context)!.nav_profile,
            ),
        ],
        ),
      ),
      body: Obx(() => controller.screens[controller.selectedIndex.value]),
    );
  }
}
