import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress = { onPress } style = { buttonStyle }>
      <Text style = { textStyle }>
        { children }
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    padding: 5,
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 2,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  }
};

export default Button;