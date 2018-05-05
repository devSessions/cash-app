import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: "#000000",
    padding: 5
  },
  buttonStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    padding: 8,
    marginBottom: 20
  }
};

export default Button;
