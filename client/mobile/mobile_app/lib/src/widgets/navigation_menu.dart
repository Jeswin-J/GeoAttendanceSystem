import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:get/get.dart';
import 'package:iconsax/iconsax.dart';
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
          elevation: 4,
          indicatorShape: const RoundedRectangleBorder(
            side: BorderSide(
              color: Colors.blue,
              strokeAlign: BorderSide.strokeAlignOutside,
            ),
            borderRadius: BorderRadius.all(Radius.circular(5)),
          ),
          indicatorColor: Colors.blue.withOpacity(0.1),
          selectedIndex: controller.selectedIndex.value,
          onDestinationSelected: (index) =>
              controller.selectedIndex.value = index,
          backgroundColor: Colors.white,
          shadowColor: Colors.black,
          destinations: [
            NavigationDestination(
              icon: const Icon(
                Iconsax.home,
                size: 24,
              ),
              label: AppLocalizations.of(context)!.nav_home,
            ),
            NavigationDestination(
              icon: const Icon(
                Iconsax.receipt,
                size: 24,
              ),
              label: AppLocalizations.of(context)!.nav_attendance,
            ),
            NavigationDestination(
              icon: const Icon(
                Iconsax.setting_24,
                size: 24,
              ),
              label: AppLocalizations.of(context)!.nav_settings,
            ),
            NavigationDestination(
              icon: const Icon(
                Iconsax.user,
                size: 24,
              ),
              label: AppLocalizations.of(context)!.nav_profile,
            ),
          ],
        ),
      ),
      body: Obx(() => controller.screens[controller.selectedIndex.value]),
    );
  }
}
