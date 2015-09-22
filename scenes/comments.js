/* @flow */

var React = require('react-native');
var {
  Component,
  View,
  WebView,
  Text,
  TouchableNativeFeedback,
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

  constructor() {
    super();
    this.state = { collapsed: false };
  }

  render() {
    return (<TouchableNativeFeedback onPress={() => this.setState({collapsed: !this.state.collapsed})}>
      <View style={[commentStyles.commentBase, this.props.topLevel && commentStyles.commentTopLevel]}>
        <View style={{flexDirection: 'row', paddingBottom: 5}}>
          <Text style={{flex: 1, fontSize: 15, color: '#bf223f', fontWeight: 'bold'}}>{this.props.comment.user}</Text>
          <Text>{this.props.comment.time_ago}</Text>
        </View>
        <View style={this.state.collapsed && {height: 40}}>
          <View style={this.state.collapsed && {opacity: 0.1}}>
            <Text style={{color: 'black'}}>{this.props.comment.content}</Text>
            <View style={{paddingLeft: 10, paddingBottom: 10}}>
              {this.props.comment.comments.map(c => <Comment comment={c} key={c.id} />)}
            </View>
          </View>
          {this.state.collapsed &&
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 30}}>&bull;&bull;&bull;</Text>
            </View>
          }
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

class Comments extends Component {
  props: {
    story: Story,
    navigator: any
  };
  static defaultProps: {};

  showStory(story: Story) {
    this.props.navigator.push({
      component: Article,
      passProps: { story }
    });
  }

  render() {
    return <View style={{flex: 1}}>
        <ItemSummary story={this.props.story} showStory={this.showStory.bind(this)} />
        <ScrollView style={{flex: 1}}>
          {this.props.story.comments.map(c => <Comment comment={c} key={c.id} topLevel={true} />)}
        </ScrollView>
      </View>;
  }
}

module.exports = connect(state => state.toJS())(Comments);

var commentStyles = StyleSheet.create({
  commentBase: {
    paddingTop: 10,
    backgroundColor: 'white'
  },
  commentTopLevel: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
})
