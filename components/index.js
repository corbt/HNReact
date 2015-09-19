/* @flow */

var React = require('react-native');

var {
  Component,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  BackAndroid,
} = React;

var { connect } = require('react-redux/native');

var Article = require('./article');

class Item extends Component {
  render() {
    var separator = <Text style={{fontSize: 15, color: 'black'}}> &bull; </Text>;
    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: '#FFB65D', flexDirection: 'row', alignItems: 'stretch', height: 100}}>
        <TouchableHighlight style={{flex: 1}} onPress={() => this.props.loadStory(this.props.story)}>
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
        <TouchableHighlight underlayColor={'orange'}>
          <View style={{flex: 1, alignSelf: 'center', backgroundColor: '#FFCC8D', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 5}}>
            <Text style={{fontSize: 30}}>{this.props.story.comments_count}</Text>
            <Text style={{fontSize: 10}}>COMMENTS</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class Index extends Component {
  loadStory(story: any) {
    this.props.navigator.push({
      name: 'Article',
      component: Article,
      passProps: { story },
      index: 1
    });
  }

  render() {
    return (
      <ScrollView>
        {this.props.topStories.stories.map(storyId => 
          {
            var story = this.props.stories[storyId];
            return <Item story={story} key={story.id} loadStory={this.loadStory.bind(this)}></Item>
          })
        }
      </ScrollView>
    );
  }
}

module.exports = connect(state => state.toJS())(Index);
