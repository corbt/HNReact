/* @flow */

const Redux = require('redux');

const TOP_STORIES_REFRESHING = 'TOP_STORIES_REFRESHING';
const SET_TOP_STORIES = 'SET_TOP_STORIES';
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

function requestStory(storyId: number): (dispatch: any) => void {
  return (dispatch) => {
    dispatch(updateStory(storyId, {isRefreshing: true}))

    fetch(`http://node-hnapi.herokuapp.com/item/${storyId}`)
      .then(response => response.json())
      .then((story: Story) => dispatch(updateStory(story.id, story)));
  }
}

const UPDATE_STORY = 'UPDATE_STORY';
function updateStory(storyId: number, attributes: Object): Action {
  return { type: UPDATE_STORY, value: { storyId, attributes } };
}

const SET_CURRENT_STORY = 'SET_CURRENT_STORY';
function setCurrentStory(storyId: number): Action {
  return { type: SET_CURRENT_STORY, value: storyId };
}

module.exports = {
  TOP_STORIES_REFRESHING, SET_TOP_STORIES, requestTopStories,
  UPDATE_STORY, requestStory,
  SET_CURRENT_STORY, setCurrentStory,
}
