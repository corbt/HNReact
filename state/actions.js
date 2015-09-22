/* @flow */

var Redux = require('redux');

var TOP_STORIES_REFRESHING = 'TOP_STORIES_REFRESHING';
var SET_TOP_STORIES = 'SET_TOP_STORIES';
function requestTopStories(): any {
  return (dispatch) => {
    dispatch({type: TOP_STORIES_REFRESHING, value: true});

    fetch("http://node-hnapi.herokuapp.com/news")
      .then(response => response.json())
      .then(json => {
        json.forEach(story => dispatch(updateStory(story.id, story)));

        dispatch({type: SET_TOP_STORIES, value: json.map(story => story.id)})
      });
  }
}

function requestStory(storyId: number) {
  return(dispatch) => {
    dispatch(updateStory(storyId, {isRefreshing: true}))

    fetch(`http://node-hnapi.herokuapp.com/item/${storyId}`)
      .then(response => response.json())
      .then((story: Story) => dispatch(updateStory, story.id, story));
  }
}

var SET_TOP_STORIES = 'SET_TOP_STORIES';
function setTopStories(topStories: Array<number> = [], isRefreshing: boolean = false) {

}

var UPDATE_STORY = 'UPDATE_STORY';
function updateStory(storyId: number, attributes: Object): Action {
  return { type: UPDATE_STORY, value: { storyId, attributes } };
}

var SET_CURRENT_STORY = 'SET_CURRENT_STORY';
function setCurrentStory(storyId: number) {

}

module.exports = {
  TOP_STORIES_REFRESHING, SET_TOP_STORIES, requestTopStories,
  UPDATE_STORY,
}