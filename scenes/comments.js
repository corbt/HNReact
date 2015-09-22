/* @flow */

var React = require('react-native');
var {
  Component,
  View,
  WebView,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} = React;

var { connect } = require('react-redux/native');

var Article = require('./article');

var ItemSummary = require('../components/ItemSummary');

// type testTypes = 

class Comment extends Component {
  props: {
    comment: CommentData,
    topLevel: boolean
  };
  static defaultProps: {};
  render() {
    return <View style={[commentStyles.base, this.props.topLevel && commentStyles.topLevel]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1, fontSize: 15, color: '#bf223f', fontWeight: 'bold'}}>{this.props.comment.user}</Text>
        <Text style={{}}>{this.props.comment.time_ago}</Text>
      </View>
      <Text style={{color: 'black'}}>{this.props.comment.content}</Text>
      <View style={{paddingLeft: 10}}>
        {this.props.comment.comments.map(c => <Comment comment={c} />)}
      </View>
    </View>;
  }
}

class Comments extends Component {
  showStory(story: Story) {
    this.props.navigator.push({
      component: Article,
      passProps: { story }
    });
  }

  render() {
    return <View style={{flex: 1, backgroundColor: 'white'}}>
        <ItemSummary story={this.props.story} showStory={this.showStory.bind(this)} />
        <ScrollView style={{flex: 1}}>
          {this.props.story.comments.map(c => <Comment comment={c} topLevel={true} />)}
        </ScrollView>
      </View>;
  }
}

module.exports = connect(state => state.toJS())(Comments);

var commentStyles = StyleSheet.create({
  base: {
    paddingTop: 10,
    paddingBottom: 10
  },
  topLevel: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
  }
})