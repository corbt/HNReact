/* @flow */

const React = require('react-native');

let {
  Component,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ListView
} = React;

const Immutable = require('immutable');
let { connect } = require('react-redux/native');

const Article = require('./article');
const Comments = require('./comments');

const ItemSummary = require('../components/ItemSummary');

let { setCurrentStory, requestTopStories } = require('../state/actions');

class Index extends Component {
  constructor(props) {
    super(props);

    props.dispatch(requestTopStories());

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  showStory(story) {
    this.props.navigator.push({
      component: Article,
      passProps: { story }
    });
    this.props.dispatch(setCurrentStory(story.get('id')));
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

module.exports = connect(store => { return { store } })(Index);
