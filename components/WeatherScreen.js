import React, { Component } from "react";
import { Text, View } from "react-native";
import axios from "axios";

export class WeatherScreen extends Component {
  state = { country: "", main: "", moreMain: "", temp: 0, getCountry: "Cairo" };
  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.getCountry}&appid=aa7f791f59683027dc7f4b3c7dbc2cdf`
      )
      .then(Response => {
        var temp = Response.data.main.temp - 272.15;
        temp = temp.toPrecision(2);
        this.setState({
          country: Response.data.name,
          main: Response.data.weather[0].main,
          moreMain: Response.data.weather[0].description,
          temp
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = getCountry => {
    this.setState({ getCountry: getCountry.nativeEvent.text });
  };

  render() {
    return (
      <View>
        <Text> Weather Screen </Text>
      </View>
    );
  }
}

export default WeatherScreen;
/*

render()
{const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    textAlign:"center",
    fontFamily:Platform.OS==='ios'?"AvenirNext-Regular":"Roboto"
  },
  largeText:{fontSize:44},
  smallText:{fontSize:18},
  textInput:{
    backgroundColor:"#666",
    color:"white",
    height:40,
    width:300,
    marginTop:20,
    marginHorizontal:20,
    paddingHorizontal:10,
    alignSelf:'center'
  }
});
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={[styles.largeText,styles.textStyle]}>{this.state.country}</Text>
      <Text style={[styles.smallText,styles.textStyle]}>{this.state.main}</Text>
      <Text style={[styles.smallText,styles.textStyle]}>{this.state.moreMain}</Text>
      <Text style={[styles.largeText,styles.textStyle]}>{this.state.temp}°</Text>
      <Picker
      selectedValue={this.state.language}
      style={{height: 50, width: 100}}
      onValueChange={(itemValue, itemIndex) =>
        this.setState({language: itemValue})
      }>
      <Picker.Item label="Java" value="java" />
   
      </Picker>
      <SearchInput placeholder="Search any City" handleChange={this.handleChange}/>
    </KeyboardAvoidingView>
  );

*/
