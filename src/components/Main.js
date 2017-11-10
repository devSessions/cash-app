import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Camera from 'react-native-camera';

import InfoBar from './common/InfoBar';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'DETECTED',
      cash: 'RS. 1000',
      backgroundColor: '#41D3BD',
    }

    this.onCaptureClick = this.onCaptureClick.bind(this);
  }

  onCaptureClick() {
    if(this.state.status === 'DETECTED') {
      this.setState({ status: 'ERROR', cash: '404', backgroundColor: 'red' });
    } else {
      this.setState({ status: 'DETECTED', cash: 'RS. 1000', backgroundColor: '#41D3BD' })
    }
  }

  render() {
    const { 
      container,
      camera,
      preview,
      capture,
    } = styles;

    const { status, cash, backgroundColor } = this.state;
    
    return (
      <View style = { container }>
        <InfoBar 
          status = { status }
          cash = { cash }
          backgroundColor = { backgroundColor }
        />
        <View style = { camera }>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style = { preview }
            aspect={Camera.constants.Aspect.fill}
          >
            <Text 
              style = { capture }
              onPress = { this.onCaptureClick }
            >
              CAPTURE
            </Text>
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
  },
});
