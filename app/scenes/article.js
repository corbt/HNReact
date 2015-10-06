/* @flow */

import React, { Component, View, WebView, Text } from 'react-native';
import WebIntent from 'react-native-webintent';

export default class Article extends Component {
  componentDidMount() {
    this.props.navigator.pop();
    // WebIntent.open(this.props.story.get('url'));
  }
  render() {
    return <Text />;
    // return (
    //   <Text>{this.props.story.url}+{__DEV__.toString()}</Text>
    // );
  }
}
