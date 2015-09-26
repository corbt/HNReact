/* @flow */

const React = require('react-native');

let {
  Component,
  View,
  WebView,
  Text,
} = React;

module.exports = class Article extends Component {
  render() {
    return (
      <Text>{this.props.story.url}+{__DEV__.toString()}</Text>
    );
  }
}
