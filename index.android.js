/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
RCTDeviceEventEmitter.addListener('hardwareBackPress', function() {
  console.log("pressed!")
});

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

class HNReact extends Component {
  constructor() {
    super();
    BackAndroid.addEventListener("hardwareBackPress", (e) => { console.log("back!!"); return true })
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Index', component: Index}}
        navigationBar={<ToolbarAndroid />}
        renderScene={(route, navigator) => {
          console.log({route, navigator});
          if(route.component) {
            return React.createElement(route.component, { navigator, ...route.passProps })
          }
        }}
      ></Navigator>
    );
  }

  _handleBackButtonPress() {
    console.log("back!!!")
    this.props.navigator.pop();
  }
}

AppRegistry.registerComponent('HNReact', () => HNReact);
