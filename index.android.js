/* @flow */

var React = require('react-native');
var {
  Component,
  AppRegistry,
  Text,
  Navigator,
  ToolbarAndroid,
  BackAndroid
} = React;

var Index = require('./components/index');
var store = require('./state/store');

var { Provider } = require('react-redux/native');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

        // navigationBar={<ToolbarAndroid />}

class HNReact extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => 
          <Navigator
            initialRoute={{name: 'Index', component: Index}}
            renderScene={(route, navigator) => {
              _navigator = navigator;
              if(route.component) {
                return React.createElement(route.component, { navigator, ...route.passProps })
              }
            }}
          />
        }
      </Provider>
    );
  }
}

AppRegistry.registerComponent('HNReact', () => HNReact);
