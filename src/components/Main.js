import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';

import InfoBar from './common/InfoBar';
import Button from './common/Button';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'CASH IDENTIFER',
      cash: 'With AI',
      backgroundColor: '#41D3BD',
    }

    this.onCaptureClick = this.onCaptureClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  onCaptureClick() {
    this.setState({ status: 'COMPUTING', cash: 'Please Wait...', backgroundColor: '#41D3BD' });
    this.takePicture();
  }

  takePicture() {
    this.camera.capture()
      .then((image) => this.sendToServer(image))
      .catch((error) => this.setState({ status: 'ERROR', cash: error, backgroundColor: '#D81159' }));
  }

  sendToServer(image) {
    this.setState({ status: 'ERROR', cash: '404', backgroundColor: '#D81159' });
    // axios.post('/test', {
    //   data: image,
    // })
    // .then((response) => {
    //   this.setState({ status: 'DETECTED', cash: 'RS. 1000', backgroundColor: '#41D3BD' });
    // })
    // .catch((error) => {
    //   this.setState({ status: 'ERROR', cash: error, backgroundColor: '#D81159' });
    // });
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
            <View style={{ marginBottom: 20 }}>
              <Button onPress={this.onCaptureClick}>Capture</Button>
            </View>
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
    backgroundColor: 'red',
  },
});
