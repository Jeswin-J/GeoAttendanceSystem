import 'package:flutter/material.dart';
import 'package:get/get.dart';

class NavigationController extends GetxController{
  final Rx<int> selectedIndex = 0.obs;

  final screens = [
    Container(color: Colors.pink,),
    Container(color: Colors.red,),
    Container(color: Colors.blue,),
    Container(color: Colors.orange,),
  ];
}