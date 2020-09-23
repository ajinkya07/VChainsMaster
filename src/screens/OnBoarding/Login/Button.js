import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
const Button = ({onPress, title, buttonTouchContainer, buttonContainer}) => (
  <View style={[styles.buttonTouchContainer, buttonTouchContainer || null]}>
    <TouchableOpacity onPress={() => onPress()}>
      <View style={[styles.buttonContainer, buttonContainer || null]}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonTouchContainer: {
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  buttonContainer: {
    backgroundColor: 'yellow',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100 - 32,
  },
  textStyle: {
    fontSize: 12,
    color: '#fff',
  },
});

export default Button;
