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

// fetch("http://api.openweathermap.org/data/2.5/weather?q=London", {
// 	"method": "GET",
// 	"headers": 
//     {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
	
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
// fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=aa7f791f59683027dc7f4b3c7dbc2cdf"
// )
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });