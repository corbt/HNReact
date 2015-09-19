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

class HNReact extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Index', component: Index}}
        navigationBar={<ToolbarAndroid />}
        renderScene={(route, navigator) => {
          if(route.component) {
            return React.createElement(route.component, { navigator, ...route.passProps })
          }
        }}
      ></Navigator>
    );
  }
}

AppRegistry.registerComponent('HNReact', () => HNReact);
