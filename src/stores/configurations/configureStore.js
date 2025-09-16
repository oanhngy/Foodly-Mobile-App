import { createStore, compose } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import {createLogger} from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducer';
import {AppActions} from '../actions';

const config = {
  key: 'root',
  timeout: 0,
  storage: AsyncStorage,
  debug: true,
  stateReconciler: hardSet,
};
// const sagaMiddleware = createSagaMiddleware();
const middleware = [];
// middleware.push(sagaMiddleware);
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   middleware.push(createLogger());
//   ``;
// } else {
//   // production code
// }
const reducers = persistReducer(config, rootReducers);
// const enhancers = [applyMiddleware(...middleware)];
const persistConfig = {};
const store = createStore(reducers, {}, compose());
const persistor = persistStore(store, persistConfig, () => {
  const stateData = store.getState();
  if (!stateData.AppReducer.deviceId) {
    const deviceId = "823749283794";
    store.dispatch(AppActions.setDeviceId.request(deviceId.replace(/-/g, '')));
  }
});
const configureStore = () => {
  return {persistor, store};
};
// sagaMiddleware.run(rootSagas);
export default configureStore;
