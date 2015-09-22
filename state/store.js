/* @flow */

var Redux = require('redux');
var { createStore, applyMiddleware } = Redux;
var thunk = require('redux-thunk');

var reducer = require('./reducers');

//TMP
var actions = require('./actions');

var logger = store => next => action => {
  if(console.groupCollapsed)
    console.groupCollapsed(action.type);
  console.info('dispatching', action);
  var result = next(action);
  console.log('next state', store.getState().toJS());
  if(console.groupCollapsed)
    console.groupEnd(action.type);
  return result;
};

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

var store = createStoreWithMiddleware(reducer);

store.dispatch(actions.requestTopStories());

module.exports = store;
