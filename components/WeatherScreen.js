import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  BackHandler
} from "react-native";
import axios from "axios";
import ClearDay from "../assets/ClearDay.jpg";
import ClearNight from "../assets/ClearNight.jpg";
import Rain from "../assets/Rain.jpg";
import Hail from "../assets/Hail.jpg";
import Fog from "../assets/fog.jpg";
import Cloudy from "../assets/cloudy.jpg";
import Wind from "../assets/wind.jpg";
import PartlyCloudyDay from "../assets/PartlyCloudyday.jpg";
import PartlyCloudyNight from "../assets/PartlyCloudyNight.jpg";
import Snow from "../assets/snow.jpg";
import ThunderStorm from "../assets/Thunderstorm.jpg";
import Sleet from "../assets/sleet.jpg";

class WeatherScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  //
  state = { country: "", main: "", temp: 0, moreMain: "", state: "", icon: "" };

  handleBackPress = () => {
    // this.goBack(); // works best when the goBack is async
    ///BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };
  componentDidMount() {
    /* this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );*/
    var arr = [
      { icon: ClearDay, Name: "clear-day" },
      { icon: ClearNight, Name: "clear-night" },
      { icon: Rain, Name: "rain" },
      { icon: Hail, Name: "hail" },
      { icon: PartlyCloudyDay, Name: "partly-cloudy-day" },
      { icon: PartlyCloudyNight, Name: "partly-cloudy-night" },
      { icon: Snow, Name: "snow" },
      { icon: ThunderStorm, Name: "thunderstorm" },
      { icon: Sleet, Name: "sleet" },
      { icon: Wind, Name: "wind" },
      { icon: Fog, Name: "fog" },
      { icon: Cloudy, Name: "cloudy" }
    ];
    var data = this.props.navigation.state.params.data;
    let country = data.SelectCountry.toUpperCase();
    let main = data.SelectCity;
    //
    this.setState({ country, main });
    axios
      .get(
        `https://api.darksky.net/forecast/YOUR KEY HERE/${data.data.latitude},${data.data.longitude}`
        "
      )
      .then(Response => {
        var temp = (Response.data.currently.temperature - 32) * 5;
        temp /= 9;
        temp = temp.toPrecision(2);
        console.log(Response.data.currently);
        let dax = Response.data.currently.icon;
        let _data = arr.filter(x => x.Name === dax);
        let icon = _data[0].icon;
        let moreMain = Response.data.currently.summary;
        this.setState({ temp, moreMain, icon });
      })
      .catch(e => console.log(e));
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      textStyle: {
        textAlign: "center",
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto"
      },
      largeText: { fontSize: 44 },
      smallText: { fontSize: 18 },
      textInput: {
        backgroundColor: "#666",
        color: "white",
        height: 40,
        width: 300,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: "center"
      }
    });
    console.log(this.state.temp);
    return (
      <KeyboardAvoidingView behavior="padding">
        <ImageBackground
          source={this.state.icon}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Text style={[styles.largeText, styles.textStyle]}>
              {this.state.country}
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
              {this.state.main}
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
              {this.state.moreMain}
            </Text>
            <Text style={[styles.largeText, styles.textStyle]}>
              {this.state.temp >= 0 ? (
                this.state.temp + "°"
              ) : (
                <React.Fragment>{-1 * this.state.temp + "°"}-</React.Fragment>
              )}
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default WeatherScreen;
