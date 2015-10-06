/* @flow */

import Immutable from 'immutable';
import * as actions from './actions';

function initialState(): Immutable.Map {
  return new Immutable.fromJS({
    currentStoryId: null,
    stories: {},
    topStories: {
      lastRefresh: null,
      isRefreshing: false,
      stories: []
    },
  });
}

/**
 * Recursively marks new comments added since the last time the page was viewed.
 * This function also returns the greatest timestamp found, so when we refresh
 * the page the next time we know which ones to mark as unread.
 */
function markNewComments(comment, lastCommentUpdate): number {
  comment.new = comment.time > lastCommentUpdate;
  if(comment.new) {
    console.log(`Congrats, a new comment! Text: ${comment.content}`)
  }
  return Math.max(
    comment.time,
    ...comment.comments.map(c => markNewComments(c, lastCommentUpdate)));
}

export default function reducer(state: Immutable.Map = initialState(), action: Action): Immutable.Map {
  // console.log(state.toJS())
  switch(action.type) {
    case actions.TOP_STORIES_REFRESHING:
      return state.updateIn(['topStories', 'isRefreshing'], () => action.value);

    case actions.SET_TOP_STORIES:
      return state.mergeIn(['topStories'], {stories: action.value, lastRefresh: new Date(), isRefreshing: false});

    case actions.UPDATE_STORY:
      if('comments' in action.value.attributes) {
        const previousUpdate = state.getIn(['stories', action.value.storyId, 'lastCommentUpdate']);
        const latestCommentTimestamp = markNewComments(action.value.attributes, previousUpdate)
        action.value.attributes.lastCommentUpdate = latestCommentTimestamp;
      }

      return state.updateIn(['stories', action.value.storyId], (val) =>
        (val || Immutable.Map()).merge(action.value.attributes));

    case actions.SET_CURRENT_STORY:
      return state.set('currentStoryId', action.value);

    case "@@redux/INIT":
      return state;

    default:
      console.warn(`Unhandled action ${JSON.stringify(action)}`);
      return state;
  }
}
