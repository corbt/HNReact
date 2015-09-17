/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  Component,
  AppRegistry,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  BackAndroid
} = React;

var Index = require('./components/index');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class HNReact extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: 'Index', component: Index}}
        navigationBar={<ToolbarAndroid />}
        renderScene={(route, navigator) => {
          _navigator = navigator;
          console.log({route, navigator});
          if(route.component) {
            return React.createElement(route.component, { navigator, ...route.passProps })
          }
        }}
      ></Navigator>
    );
  }
}

AppRegistry.registerComponent('HNReact', () => HNReact);
