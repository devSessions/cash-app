import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class InfoBar extends Component {
  render() {
    const { infoBar, statusText, cashText } = styles;
    const { status, cash, backgroundColor } = this.props;
    return (
      <View style={[infoBar, { backgroundColor }]}>
        <Text style={statusText}>{status}</Text>
        <Text style={cashText}>{cash}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  statusText: {
    fontSize: 30,
    color: "#FFFFFF",
    padding: 3
  },
  cashText: {
    fontSize: 50,
    color: "#FFFFFF",
    textAlign: "center",
    padding: 5
  }
});
