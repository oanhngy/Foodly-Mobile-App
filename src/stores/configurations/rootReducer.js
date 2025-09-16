import {combineReducers} from 'redux';

import {
  AppReducer,
  AuthenticationReducer,
  UserReducer,
} from '../reducers';
const rootReducer = combineReducers({
  AppReducer,
  AuthenticationReducer,
  UserReducer,
});

export default rootReducer;
