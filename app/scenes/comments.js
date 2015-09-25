/* @flow */

var React = require('react-native');
var {
  Component,
  View,
  WebView,
  Text,
  ToolbarAndroid,
  TouchableNativeFeedback,
  ScrollView,
  StyleSheet,
  ListView,
} = React;

var Immutable = require('immutable');
var { connect } = require('react-redux/native');

var Article = require('./article');

var ItemSummary = require('../components/ItemSummary');
var { requestStory } = require('../state/actions');

class Comment extends Component {
  props: {
    comment: Immutable.Map,
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
          <Text style={{flex: 1, fontSize: 15, color: '#bf223f', fontWeight: 'bold'}}>{this.props.comment.get('user')}</Text>
          <Text>{this.props.comment.time_ago}</Text>
        </View>
        <View style={this.state.collapsed && {height: 40}}>
          <View style={this.state.collapsed && {opacity: 0.1}}>
            <Text style={{color: 'black'}}>{this.props.comment.get('content')}</Text>
            <View style={{paddingLeft: 10, paddingBottom: 10}}>
              {this.props.comment.get('comments').map(c => <Comment comment={c} key={c.get('id')} />)}
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
    story: Immutable.Map,
    dispatch: any,
    navigator: any
  };
  static defaultProps: {};

  constructor(props) {
    super(props);
    props.dispatch(requestStory(props.story.get('id')));

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  showStory(story) {
    this.props.navigator.push({
      component: Article,
      passProps: { story }
    });
  }

  render() {
    var dataSource = this.state.dataSource.cloneWithRows((this.props.story.get('comments') || Immutable.List()).toArray());

    return <View style={{flex: 1}}>
        <ItemSummary story={this.props.story} showStory={this.showStory.bind(this)} back={() => this.props.navigator.pop()} />
        <ListView style={{flex: 1}} dataSource={dataSource} renderRow={comment =>
          <Comment comment={comment} key={comment.get('id')} topLevel={true} /> }>
        </ListView>
      </View>;
  }
}

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

function mapStateToProps(state) {
  return { story: state.getIn(['stories', state.get('currentStoryId')]) }
}
module.exports = connect(mapStateToProps)(Comments);
