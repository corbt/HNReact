var { PropTypes, requireNativeComponent } = require('react-native');

var iface = {
  name: 'SwipeRefresh',
  propTypes: {
    color: PropTypes.string,
  },
};

module.exports = requireNativeComponent('RCTSwipeRefreshLayout', iface);
