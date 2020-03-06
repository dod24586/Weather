import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WeatherScreen from "./components/WeatherScreen";
import { CountryScreen } from "./components/CountryScreen";

const MainNavigator = createStackNavigator({
  CountryScreen: { screen: CountryScreen },
  WeatherScreen: { screen: WeatherScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
