/* @flow */

var React = require('react-native');

var {
  Component,
  Text,
  View,
  TouchableHighlight,
} = React;

var { connect } = require('react-redux/native');

type itemSummaryProps = {
  story: Story,
  showStory: (s: Story) => void,
  showComments: (s: Story) => void
}

class ItemSummary extends Component {
  props: itemSummaryProps;
  static defaultProps: {};

  render() {
    var separator = <Text style={{fontSize: 15, color: 'black'}}> &bull; </Text>;
    var comments = null;
    if( !(this.props.showComments == null) ) {
      var showComments = this.props.showComments;
      comments = <TouchableHighlight underlayColor={'orange'} onPress={() => showComments(this.props.story)}>
        <View style={{flex: 1, alignSelf: 'center', backgroundColor: '#FFCC8D', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 5}}>
          <Text style={{fontSize: 30}}>{this.props.story.comments_count}</Text>
          <Text style={{fontSize: 10}}>COMMENTS</Text>
        </View>
      </TouchableHighlight>
    }
    return (
      // <Text>hello world</Text>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#FFB65D', flexDirection: 'row', alignItems: 'stretch'}}>
        <TouchableHighlight style={{flex: 1}} onPress={() => this.props.showStory(this.props.story)}>
          <View style={{flex: 1, padding: 10, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}>{this.props.story.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.story.points} points</Text>
              {separator}
              <Text>{this.props.story.user}</Text>
              {separator}
              <Text>{this.props.story.time_ago}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {comments}
      </View>
    );
  }
}

module.exports = ItemSummary;
