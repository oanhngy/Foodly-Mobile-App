import { createHandleReducer } from '../../helpers/reduxHelpers';
import {AppActions} from '../actions';

const initialState = {
  appConfig: {},
};

const AppReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(AppActions.setConfig.request, (state, action) => {
    state.appConfig = {
      ...state.appConfig,
      ...action.payload,
    };
  })
    .addCase(AppActions.setDeviceId.request, (state, action) => {
    state.deviceId = action.payload;
  })
    .addCase(AppActions.setServerDown.request, (state, action) => {
    state.is_server_down = action.payload;
  });
});

export default AppReducer;
