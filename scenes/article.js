/* @flow */

var React = require('react-native');

var {
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
