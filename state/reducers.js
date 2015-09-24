/* @flow */

var Immutable = require('immutable');
var actions = require('./actions');

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

function reducer(state: Immutable.Map = initialState(), action: Action) {
  // console.log(state.toJS())
  switch(action.type) {
    case actions.TOP_STORIES_REFRESHING:
      return state.updateIn(['topStories', 'isRefreshing'], () => action.value);

    case actions.SET_TOP_STORIES:
      return state.mergeIn(['topStories'], {stories: action.value, lastRefresh: new Date(), isRefreshing: false});

    case actions.UPDATE_STORY:
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

module.exports = reducer;
