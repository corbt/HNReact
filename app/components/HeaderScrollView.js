/* @flow */

const React = require('react-native');

let {
  Component,
  Text,
  StyleSheet,
  View,
  ScrollView,
} = React;

module.exports = class HeaderScrollView extends Component {
  constructor() {
    super();
    this.state = {headerHeight: 0, top: 0, scrollOffset: 0}
  }

  reactToScroll(e) {
    const scrollOffset = e.nativeEvent.contentOffset.y;
    const deltaOffset = scrollOffset - this.state.scrollOffset;
    let stateUpdate: { scrollOffset: any, top?: number } = { scrollOffset };

    // Update the top to be (top - deltaOffset) subject to the following constraints:
    // top <= 0
    // top >= -headerHeight
    // top >= -scrollOffset
    stateUpdate.top = Math.max(Math.min(this.state.top - deltaOffset, 0), -this.state.headerHeight, -scrollOffset);
    this.setState(stateUpdate);
  }

  render() {
    let { style, header, children, ...props } = this.props;
    return <View style={style}>
      <ScrollView {...props}
        style={[style, {top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', paddingTop: this.state.headerHeight}]}
        onScroll={this.reactToScroll.bind(this)}>
        {children}
      </ScrollView>
      <View onLayout={event => this.setState({headerHeight: event.nativeEvent.layout.height})} style={{position: 'absolute', left: 0, right: 0, top: this.state.top}}>
        {header}
      </View>
    </View>;
  }
}
