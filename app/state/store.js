/* @flow */

const Redux = require('redux');
let { createStore, applyMiddleware } = Redux;
const thunk = require('redux-thunk');

const reducer = require('./reducers');

const logger = store => next => action => {
  if(console.groupCollapsed)
    console.groupCollapsed(action.type);
  console.info('dispatching', action);
  var result = next(action);
  console.log('next state', store.getState().toJS());
  if(console.groupCollapsed)
    console.groupEnd(action.type);
  return result;
};

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

module.exports = createStoreWithMiddleware(reducer);;
