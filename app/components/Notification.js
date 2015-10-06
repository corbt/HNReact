import React, { Component, View, StyleSheet } from 'react-native';

export default class Notification {
  render() {
    return <View style={[styles.indeterminate, this.props.style]} />;
  }
}

const radius = 3;
const styles = StyleSheet.create({
  indeterminate: {
    backgroundColor: '#bf223f',
    height: radius*2,
    width: radius*2,
    borderRadius: radius,
  }
})
