import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import icon from "../assets/icon.png";
export class CountryScreen extends Component {
  static navigationOptions = {
    headerTitle: "Country",
    headerTitleAlign: "center"
  };
  state = {
    SelectCountry: "",
    SelectCity: "",
    allCountry: [],
    allCity: [],
    allState: [],
    data: {}
  };
  componentWillUnmount() {
    //do something here
  }
  componentDidMount() {
    axios
      .get(
        "http://battuta.medunes.net/api/country/all/?key=YOU KEY HERE"
      )
      .then(Response => {
        var allCountry = Response.data.map(x => {
          return {
            label: x.name + " (" + x.code.toUpperCase() + ")",
            value: x.code
          };
        });
        this.setState({ allCountry });
      })
      .catch(e => console.log(e));
  }
  handleCountry = val => {
    this.setState({ allCity: [] });
    axios
      .get(
        `http://battuta.medunes.net/api/region/${val}/all/?key= YOUR KEY HERE`
      )
      .then(Response => {
        var allCity = Response.data.map(x => {
          return {
            label: x.region,
            value: x.region
          };
        });
        this.setState({ allCity, SelectCountry: val });
      })
      .catch(e => console.log(e));
  };
  handleCity = val => {
    axios
      .get(
        `http://battuta.medunes.net/api/city/${this.state.SelectCountry}/search/?region=${val}&key=YOUR KEY HERE`
      )
      .then(Response => {
        var allState = Response.data.map(x => {
          return {
            label: x.city,
            value: {
              longitude: x.longitude,
              latitude: x.latitude,
              state: x.city
            }
          };
        });
        this.setState({ allState, SelectCity: val });
      })
      .catch(e => console.log(e));
  };
  handleState = val => {
    this.setState({ data: val });
  };
  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "flex-start"
      }
    });
    ///console.log("-------------------------------------------------")
    // console.log(this.state.allCountry)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <View>
          <Image
            source={icon}
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
              marginBottom: 50,
              resizeMode: "stretch"
            }}
          />
        </View>
        <Text
          style={{
            marginBottom: 20,
            fontFamily: "sans-serif-light",
            fontWeight: "normal",
            fontSize: 20
          }}
        >
          Select Your Country
        </Text>
        <View
          style={{
            flex: 0,
            backgroundColor: "#fff",
            alignItems: "flex-end",
            alignSelf: "stretch",
            marginRight: 20,
            borderWidth: 0.6,
            borderRadius: 5,
            marginLeft: 20,
            padding: 10
          }}
        >
          <RNPickerSelect
            onValueChange={value => this.handleCountry(value)}
            items={this.state.allCountry}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select Your Country", value: null }}
            style={{ backgroundColor: "#000", borderWidth: 1 }}
          />
        </View>
        <React.Fragment>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontFamily: "sans-serif-light",
              fontWeight: "normal",
              fontSize: 20
            }}
          >
            Select Your City
          </Text>
          <View
            style={{
              flex: 0,
              backgroundColor: "#fff",
              alignItems: "flex-end",
              alignSelf: "stretch",
              marginRight: 20,
              borderWidth: 0.6,
              borderRadius: 5,
              marginLeft: 20,
              padding: 10
            }}
          >
            <RNPickerSelect
              onValueChange={value => this.handleCity(value)}
              items={this.state.allCity}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: "Select Your City",
                value: null
              }}
              style={{ backgroundColor: "#000", borderWidth: 1 }}
            />
          </View>
        </React.Fragment>

        <React.Fragment>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontFamily: "sans-serif-light",
              fontWeight: "normal",
              fontSize: 20
            }}
          >
            Select Your State
          </Text>
          <View
            style={{
              flex: 0,
              backgroundColor: "#fff",
              alignItems: "flex-end",
              alignSelf: "stretch",
              marginRight: 20,
              borderWidth: 0.6,
              borderRadius: 5,
              marginLeft: 20,
              marginBottom: 20,
              padding: 10
            }}
          >
            <RNPickerSelect
              onValueChange={value => this.handleState(value)}
              items={this.state.allState}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select Your State", value: null }}
              style={{ backgroundColor: "#000", borderWidth: 1 }}
            />
          </View>
          <Button
            title="Get Resurlt"
            color="#BD3939"
            onPress={() =>
              this.props.navigation.navigate("WeatherScreen", {
                data: this.state
              })
            }
          />
        </React.Fragment>
      </View>
    );
  }
}

export default CountryScreen;
