import React from 'react';
import { StyleSheet, Text,Picker, View , KeyboardAvoidingView , TextInput, Platform} from 'react-native';
import SearchInput from './components/SearchInput';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import  SelectCountry  from './components/SelectCountry';
import WeatherScreen  from './components/WeatherScreen';


const MainNavigator = createStackNavigator({
  SelectCountry: {screen: SelectCountry},
  WeatherScreen: {screen: WeatherScreen},
});

const App = createAppContainer(MainNavigator);



export default App;
