/* @flow */

import React, { Component, View, WebView, Text } from 'react-native';

export default class Article extends Component {
  render() {
    return (
      <Text>{this.props.story.url}+{__DEV__.toString()}</Text>
    );
  }
}
