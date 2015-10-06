/* @flow */

import React, { Component, Text, View, TouchableHighlight, ScrollView, ListView } from 'react-native';
import { connect } from 'react-redux/native';
import WebIntent from 'react-native-webintent';

import Article from './article';
import Comments from './comments';

import ItemSummary from '../components/ItemSummary';

import { setCurrentStory, requestTopStories } from '../state/actions';

class Index extends Component {
  constructor(props) {
    super(props);

    props.dispatch(requestTopStories());

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  showStory(story) {
    WebIntent.open(story.get('url'));

    // this.props.navigator.push({
    //   component: Article,
    //   passProps: { story }
    // });
    // this.props.dispatch(setCurrentStory(story.get('id')));
  }

  showComments(story) {
    this.props.dispatch(setCurrentStory(story.get('id')));
    this.props.navigator.push({
      component: Comments,
      passProps: { story }
    });
  }

  render() {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.store.getIn(['topStories', 'stories']).toJS().map(storyId => this.props.store.getIn(['stories', storyId])))
    return (
      <ListView dataSource={dataSource} renderRow={story =>
        <ItemSummary story={story} key={story.get('id')}
                  showStory={this.showStory.bind(this)}
                  showComments={this.showComments.bind(this)} />
      }>

      </ListView>
    );
  }
}

export default connect(store => { return { store } })(Index);
