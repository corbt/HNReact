/* @flow */

import Redux from 'redux';

export const TOP_STORIES_REFRESHING = 'TOP_STORIES_REFRESHING';
export const SET_TOP_STORIES = 'SET_TOP_STORIES';
export function requestTopStories(): any {
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

export function requestStory(storyId: number): (dispatch: any) => void {
  return (dispatch) => {
    dispatch(updateStory(storyId, {isRefreshing: true}))

    fetch(`http://node-hnapi.herokuapp.com/item/${storyId}`)
      .then(response => response.json())
      .then((story: Story) => {
        story.isRefreshing = false;
        dispatch(updateStory(story.id, story))
      });
  }
}

export const UPDATE_STORY = 'UPDATE_STORY';
function updateStory(storyId: number, attributes: Object): Action {
  return { type: UPDATE_STORY, value: { storyId, attributes } };
}

export const SET_CURRENT_STORY = 'SET_CURRENT_STORY';
export function setCurrentStory(storyId: number): Action {
  return { type: SET_CURRENT_STORY, value: storyId };
}

export const FOLLOW_USER = 'FOLLOW_USER';
export function followUser(user: string, follow: boolean): Action {
  return { type: FOLLOW_USER, value: { user, follow }}
}
