/* @flow */

var React = require('react-native');

var {
  Component,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
} = React;

var Immutable = require('immutable');
var { connect } = require('react-redux/native');

type itemSummaryProps = {
  story: Immutable.Map,
  showStory: (s: Story) => void,
  showComments: (s: Story) => void,
  back: () => void
}

class ItemSummary extends Component {
  props: itemSummaryProps;
  static defaultProps: {};

  render() {
    var backView = null;
    if( this.props.back != null ) {
      var back = this.props.back;
      backView = <TouchableNativeFeedback onPress={() => back()}>
        <View style={{paddingLeft: 8, justifyContent: 'center'}}><Image style={{height: 30, width: 30}} source={require('image!ic_arrow_back_black_24dp')} /></View>
      </TouchableNativeFeedback>;
    }
    var comments = null;
    if( this.props.showComments != null ) {
      var showComments = this.props.showComments;
      comments = <TouchableNativeFeedback onPress={() => showComments(this.props.story)}>
        <View style={{alignSelf: 'stretch', backgroundColor: '#FFCC8D', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 5}}>
          <Text style={{fontSize: 30}}>{this.props.story.get('comments_count')}</Text>
          <Text style={{fontSize: 10}}>COMMENTS</Text>
        </View>
      </TouchableNativeFeedback>
    }
    var separator = <Text style={{fontSize: 15, color: 'black'}}> &bull; </Text>;
    return (
      // <Text>hello world</Text>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#FFB65D', flexDirection: 'row', alignItems: 'stretch', backgroundColor: 'white', height: 100}}>
        {backView}
        <TouchableNativeFeedback onPress={() => this.props.showStory(this.props.story)}>
          <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}>{this.props.story.get('title')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.story.get('points')} points</Text>
              {separator}
              <Text>{this.props.story.get('user')}</Text>
              {separator}
              <Text>{this.props.story.get('time_ago')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        {comments}
      </View>
    );
  }
}

module.exports = ItemSummary;
