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

    // case "test": 
      // console.log("test");
    case actions.UPDATE_STORY:
      console.log("updating story");
    //   return state;
      return state.updateIn(['stories', action.storyId], (val) => 
        (val || Immutable.Map()).merge(action.attributes));

    default:
      console.warn(`Unhandled action ${JSON.stringify(action)}`);
      return state;
  }
}

module.exports = reducer;