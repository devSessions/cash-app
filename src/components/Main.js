import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import Camera from "react-native-camera";
import CryptoJS from "crypto-js";
import Config from "react-native-config";
import Tts from "react-native-tts";

import InfoBar from "./common/InfoBar";
import Button from "./common/Button";
import strings from "./string";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: strings.status,
      cash: strings.cash,
      buttonString: strings.buttonString,
      backgroundColor: "#41D3BD",
      computing: false
    };

    this.onCaptureClick = this.onCaptureClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.sendToApi = this.sendToApi.bind(this);
  }

  componentWillMount() {
    console.disableYellowBox = true;
  }

  componentDidMount() {
    strings.setLanguage("ne");
    this.setState({
      status: strings.status,
      cash: strings.cash,
      buttonString: strings.buttonString
    });
    Tts.speak("Touch the lower part of screen to capture image.");
  }

  componentWillUnmount() {
    Tts.stop();
  }

  onCaptureClick() {
    if (!this.state.computing) {
      this.setState({
        status: strings.computing,
        cash: strings.computingLoading,
        backgroundColor: "#EFDC05",
        computing: !this.state.computing
      });
      Tts.speak("Computing please wait.");
      this.takePicture();
    }
  }

  takePicture() {
    this.camera
      .capture()
      .then(image => this.sendToServer(image))
      .catch(error => {
        this.setState({
          status: strings.error,
          cash: strings.wentWrong,
          backgroundColor: "#D81159",
          computing: !this.state.computing
        });
        Tts.speak("Error, Please Try again !!!");
        Tts.speak("Touch the lower part of screen to capture image.");
      });
  }

  sendToServer(image) {
    if (image.path) {
      let timestamp = ((Date.now() / 1000) | 0).toString();
      let apiKey = Config.APIKEY;
      let apiSecret = Config.APISECRET;
      let cloud = Config.CLOUD;
      let hashString = `timestamp=${timestamp}${apiSecret}`;
      let signature = CryptoJS.SHA1(hashString).toString();
      let uploadUrl = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

      let formdata = new FormData();
      formdata.append("file", {
        uri: image.path,
        type: "image/jpg",
        name: "upload.jpg"
      });
      formdata.append("timestamp", timestamp);
      formdata.append("api_key", apiKey);
      formdata.append("signature", signature);

      fetch(uploadUrl, {
        method: "post",
        body: formdata
      })
        .then(response => response.json())
        .then(resolve => {
          this.sendToApi(resolve.secure_url);
        })
        .catch(error => {
          this.setState({
            status: strings.error,
            cash: strings.wentWrong,
            backgroundColor: "#D81159",
            computing: !this.state.computing
          });
          Tts.speak("Error, Please Try again !!!");
          Tts.speak("Touch the lower part of screen to capture image.");
        });
    }
  }

  sendToApi(url) {
    const apiUrl = "https://cash-nepal.herokuapp.com/api";

    let formData = new FormData();
    formData.append("url", url);

    fetch(apiUrl, {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(resolve => {
        let cash = resolve.cash;
        this.setState({
          status: strings.detected,
          cash: cash,
          backgroundColor: "#41D3BD",
          computing: !this.state.computing
        });
        Tts.speak(`Detected ${cash}`);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          status: strings.error,
          cash: strings.wentWrong,
          backgroundColor: "#D81159",
          computing: !this.state.computing
        });
        Tts.speak("Error, Please Try again !!!");
        Tts.speak("Touch the lower part of screen to capture image.");
      });
  }

  render() {
    const { container, camera, preview } = styles;

    const { status, cash, backgroundColor } = this.state;

    return (
      <View style={container}>
        <InfoBar
          status={status}
          cash={cash}
          backgroundColor={backgroundColor}
        />
        <View style={camera}>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={{ flex: 1 }}
            aspect={Camera.constants.Aspect.fill}
            captureQuality={Camera.constants.CaptureQuality.medium}
            flashMode={Camera.constants.FlashMode.on}
            captureTarget={Camera.constants.CaptureTarget.temp}
          >
            <TouchableWithoutFeedback onPress={this.onCaptureClick}>
              <View style={preview}>
                <Button onPress={this.onCaptureClick}>
                  {strings.buttonString}
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </Camera>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 2
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
