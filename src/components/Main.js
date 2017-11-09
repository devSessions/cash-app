import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Main extends Component {
  render() {
    const { container, infoBar, camera, status, cash } = styles;
    return (
      <View style = { container }>
        <View style = { infoBar }>
          <Text style = { status }>DETECTED</Text>
          <Text style = { cash }>RS. 1000</Text>
        </View>
        <View style = { camera }>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoBar: {
    flex: 1,
    backgroundColor: '#30A9DE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  cash: {
    fontSize: 56,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  camera: {
    flex: 2,
  }
});
