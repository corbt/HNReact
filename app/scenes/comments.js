/* @flow */

import React, { Component, View, WebView, Text, ToolbarAndroid, TouchableNativeFeedback, ScrollView, StyleSheet, ListView, ToastAndroid } from 'react-native';
import Immutable from 'immutable';
import { connect } from 'react-redux/native';
import WebIntent from 'react-native-webintent';

import Article from './article';

import ItemSummary from '../components/ItemSummary';
import FormattedText from '../components/FormattedText';
import HeaderScrollView from '../components/HeaderScrollView';
import Notification from '../components/Notification';
import { requestStory, followUser } from '../state/actions';
import timeAgo from '../helpers/TimeAgo';

@connect(state => { return { followedUsers: state.get('followedUsers') }})
class Comment extends Component {
  props: {
    comment: Immutable.Map,
    topLevel: boolean,
    followUser: (user: string, follow: boolean) => void,
  };
  static defaultProps: {};

  constructor() {
    super();
    this.state = { collapsed: false };
  }

  isFollowingUser() {
    return this.props.followedUsers.has(this.props.comment.get('user'));
  }

  toggleFollowing() {
    const user = this.props.comment.get('user');
    const follow = !this.isFollowingUser();
    this.props.dispatch(followUser(user, follow));

    const verb = follow ? "Following" : "Unfollowing";
    ToastAndroid.show(`${verb} ${user}` ,ToastAndroid.SHORT);
  }

  render() {
    const userName =
      <TouchableNativeFeedback onPress={this.toggleFollowing.bind(this)}>
        <View style={[userStyles.base, this.isFollowingUser() && userStyles.following]}>
          <Text style={userStyles.text}>{this.props.comment.get('user')}</Text>
          <Text style={[userStyles.text, userStyles.icon]}>{this.isFollowingUser() ? '-' : '+'}</Text>
        </View>
      </TouchableNativeFeedback>;

    return (<TouchableNativeFeedback onPress={() => this.setState({collapsed: !this.state.collapsed})} onLongPress={() => console.log("long!!!")}>
      <View style={[commentStyles.commentBase, this.props.topLevel && commentStyles.commentTopLevel]}>
        {this.props.comment.get('new') && <Notification style={{position: 'absolute', left: 2, top: 18}} />}
        <View style={{flexDirection: 'row', paddingBottom: 5}}>
          {userName}
          <View style={{flex: 1}}/>
          <Text>{timeAgo(this.props.comment.get('time'))}</Text>
        </View>
        <View style={this.state.collapsed && {height: 40}}>
          <View style={this.state.collapsed && {opacity: 0.1}}>
            <FormattedText style={{color: 'black', fontSize: 17}}>{this.props.comment.get('content')}</FormattedText>
            <View style={{paddingBottom: 10}}>
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

@connect(state =>
  { return { story: state.getIn(['stories', state.get('currentStoryId')]) }})
export default class Comments extends Component {
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

  showStory(story: Immutable.Map) {
    WebIntent.open(story.get('url'));

    // this.props.navigator.push({
    //   component: Article,
    //   passProps: { story }
    // });
  }

  render() {
    const dataSource = this.state.dataSource.cloneWithRows((this.props.story.get('comments') || Immutable.List()).toArray());

    return (
      <HeaderScrollView
        style={{flex: 1}}
        header={<ItemSummary story={this.props.story} showStory={this.showStory.bind(this)} back={() => this.props.navigator.pop()}/>}
        >
          <ListView
            style={{flex: 1}}
            dataSource={dataSource}
            renderRow={comment =>
              <Comment comment={comment} key={comment.get('id')} topLevel={true} /> }
            />
        </HeaderScrollView>
    );
  }
}

const commentStyles = StyleSheet.create({
  commentBase: {
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  commentTopLevel: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingRight: 10,
  },
})

const followColor = '#bf223f';
const userStyles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  icon: {
    color: followColor,
    marginLeft: 5,
  },
  base: {
    flexDirection: 'row',
  },
  following: {
    borderWidth: 1,
    borderColor: followColor,
    borderRadius: 3,
    paddingHorizontal: 5,
  }
})
