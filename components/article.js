var React = require('react-native');

var {
  Component,
  View,
  WebView,
} = React;

module.exports = class Article extends Component {
  render() {
    return (
      <View><WebView url={this.props.story.url} /></View>
    );
  }

  _handleBackButtonPress() {
    console.log("back pressed?")
    this.props.navigator.pop();
  }
}
