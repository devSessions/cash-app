import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import CryptoJS from 'crypto-js';

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
    if(image.path) {
      let timestamp = (Date.now() / 1000 | 0).toString();
      let apiKey = '193473961772195';
      let apiSecret = 'ROHw1Q_mHPEO0uL7l7kgMmZcv0c';
      let cloud = 'rabingaire';
      let hashString = `timestamp=${timestamp}${apiSecret}`;
      let signature = CryptoJS.SHA1(hashString).toString();
      let uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

      let formdata = new FormData();
      formdata.append('file', {uri: image.path, type: 'image/jpg', name: 'upload.jpg'});
      formdata.append('timestamp', timestamp);
      formdata.append('api_key', apiKey);
      formdata.append('signature', signature);

      let uploadCloudinary = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(formdata);
      });

      uploadCloudinary.then((resolve) => {
        this.setState({ status: 'DETECTED', cash: 'RS. 1000', backgroundColor: '#41D3BD' });
      })
      .catch((error) => {
        this.setState({ status: 'ERROR', cash: '400', backgroundColor: '#D81159' });
      });
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
