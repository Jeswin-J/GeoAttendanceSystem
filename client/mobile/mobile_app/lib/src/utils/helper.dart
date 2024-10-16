import 'package:flutter/material.dart';

import '../widgets/confirmation_model.dart';

Future<bool> showConfirmationDialog(BuildContext context, {
  required String title,
  required String message,
  String confirmText = 'Confirm',
  String cancelText = 'Cancel',
}) {
  return showDialog<bool>(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext context) {
      return ConfirmationDialog(
        title: title,
        message: message,
        confirmText: confirmText,
        cancelText: cancelText,
      );
    },
  ).then((value) => value ?? false);
}
