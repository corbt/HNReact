/* @flow */

var React = require('react-native');

var {
  Component,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ListView
} = React;

var { connect } = require('react-redux/native');

var Article = require('./article');
var Comments = require('./comments');

var ItemSummary = require('../components/ItemSummary');

var { setCurrentStory, requestTopStories } = require('../state/actions');

class Index extends Component {
  constructor(props) {
    super(props);
    console.log("OK, INDEX CONSTRUCTOR CALLED");

    props.dispatch(requestTopStories());

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
    return (
      <ScrollView>
        {this.props.store.getIn(['topStories', 'stories']).map(storyId =>
          {
            var story = this.props.store.getIn(['stories', storyId]);
            return <ItemSummary story={story} key={story.get('id')}
                      showStory={this.showStory.bind(this)}
                      showComments={this.showComments.bind(this)} />;
          })
        }
      </ScrollView>
    );
  }
}

module.exports = connect(store => { return { store } })(Index);
