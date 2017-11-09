import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Camera from 'react-native-camera';

export default class Main extends Component {
  render() {
    const { container, infoBar, camera, status, cash, preview, capture } = styles;
    return (
      <View style = { container }>
        <View style = { infoBar }>
          <Text style = { status }>DETECTED</Text>
          <Text style = { cash }>RS. 1000</Text>
        </View>
        <View style = { camera }>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style = { preview }
            aspect={Camera.constants.Aspect.fill}
          >
            <Text style = { capture }>CAPTURE</Text>
          </Camera>
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
    backgroundColor: '#41D3BD',
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
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    backgroundColor: '#FFFFFF',
    color: '#000',
    padding: 10,
    margin: 40,
  }
});
