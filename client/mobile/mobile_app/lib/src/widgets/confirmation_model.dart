import 'package:flutter/material.dart';

class ConfirmationDialog extends StatelessWidget {
  final String title;
  final String message;
  final String confirmText;
  final String cancelText;

  const ConfirmationDialog({
    super.key,
    required this.title,
    required this.message,
    this.confirmText = 'Confirm',
    this.cancelText = 'Cancel',
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      iconPadding: const EdgeInsets.only(top: 12, bottom: 4),
      icon: const Icon(
        Icons.warning,
        color: Colors.deepOrangeAccent,
        size: 48,
      ),
      titlePadding: const EdgeInsets.only(top: 0),
      title: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title),
        ],
      ),
      // Reducing padding around the content
      contentPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 4),
      content: Text(message),

      actionsPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),

      actions: <Widget>[
        TextButton(
          child: Text(
            cancelText,
            style: TextStyle(
                color: Colors.red.shade800, fontWeight: FontWeight.bold),
          ),
          onPressed: () {
            Navigator.of(context).pop(false);
          },
        ),
        TextButton(
          child: Text(
            confirmText,
            style: TextStyle(
                color: Colors.green.shade800, fontWeight: FontWeight.bold),
          ),
          onPressed: () {
            Navigator.of(context).pop(true);
          },
        ),
      ],
    );
  }
}
