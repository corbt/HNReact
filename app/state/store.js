/* @flow */

import Redux, { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

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

export default createStoreWithMiddleware(reducer);;
