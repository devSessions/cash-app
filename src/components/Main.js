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
import Config from 'react-native-config';

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
    this.sendToApi = this.sendToApi.bind(this);
  }

  onCaptureClick() {
    this.setState({ status: 'COMPUTING', cash: 'Please Wait...', backgroundColor: '#EFDC05' });
    this.takePicture();
  }

  takePicture() {
    this.camera.capture()
      .then((image) => this.sendToServer(image))
      .catch((error) => this.setState({ status: 'ERROR', cash: '404', backgroundColor: '#D81159' }));
  }

  sendToServer(image) {
    if(image.path) {
      let timestamp = (Date.now() / 1000 | 0).toString();
      let apiKey = Config.APIKEY;
      let apiSecret = Config.APISECRET;
      let cloud = Config.CLOUD;
      let hashString = `timestamp=${timestamp}${apiSecret}`;
      let signature = CryptoJS.SHA1(hashString).toString();
      let uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

      let formdata = new FormData();
      formdata.append('file', {uri: image.path, type: 'image/jpg', name: 'upload.jpg'});
      formdata.append('timestamp', timestamp);
      formdata.append('api_key', apiKey);
      formdata.append('signature', signature);

      fetch(uploadUrl, {
        method: 'post',
        body: formdata
      })
      .then((response) => response.json())
      .then((resolve) => {
        this.sendToApi(resolve.secure_url);
      })
      .catch((error) => {
        this.setState({ status: 'ERROR', cash: '404', backgroundColor: '#D81159' });
      });
    }
  }

  sendToApi(url) {
    const apiUrl = 'https://cash-nepal.herokuapp.com/api';

    let formData = new FormData();
    formData.append('url', url);

    fetch(apiUrl, {
      method: 'post',
      body: formData
    })
    .then((response) => response.json())
    .then((resolve) => {
      let cash = resolve.tasks[0][0].value;
      this.setState({ status: 'DETECTED', cash: cash, backgroundColor: '#41D3BD' });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ status: 'ERROR', cash: '404', backgroundColor: '#D81159' })
    });
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
            captureQuality={Camera.constants.CaptureQuality.medium}
            flashMode={Camera.constants.FlashMode.auto}
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
