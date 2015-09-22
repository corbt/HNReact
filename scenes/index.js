/* @flow */

var React = require('react-native');

var {
  Component,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} = React;

var { connect } = require('react-redux/native');

var Article = require('./article');
var Comments = require('./comments');

var ItemSummary = require('../components/ItemSummary');

class Index extends Component {
  showStory(story: Story) {
    this.props.navigator.push({
      component: Article,
      passProps: { story }
    });
  }

  showComments(story: Story) {
    this.props.navigator.push({
      component: Comments,
      passProps: { story }
    });
  }

  render() {
    return (
      <ScrollView>
        {this.props.topStories.stories.map(storyId => 
          {
            var story = this.props.stories[storyId];
            return <ItemSummary story={story} key={story.id} 
                      showStory={this.showStory.bind(this)}
                      showComments={this.showComments.bind(this)} />;
          })
        }
      </ScrollView>
    );
  }
}

module.exports = connect(state => state.toJS())(Index);