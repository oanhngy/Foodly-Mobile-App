import { createHandleReducer } from '../../helpers/reduxHelpers';
import {AuthenticationActions} from '../actions';

const initialState = {
  accessToken: undefined,
  userInfo: undefined,
};
const setAuthenticationData = (
  state,
  action,
) => {
  const {payload} = action;
  state.userInfo = payload.userInfo;
  state.accessToken = payload.accessToken;
};

const setUserInfo = (
  state,
  action,
) => {
  state.userInfo = action.payload;
}


const setAccessToken = (
  state,
  action,
) => {
  state.accessToken = action.payload;
}


const logOut = (state) => {
  state.userInfo = undefined;
  state.accessToken = undefined;
};

const AuthenticationReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(AuthenticationActions.setAuthenticationData.request, setAuthenticationData)
    .addCase(AuthenticationActions.setUserInfo.request, setUserInfo)
    .addCase(AuthenticationActions.setAccessToken.request, setAccessToken)
    .addCase(AuthenticationActions.logout.request, logOut);
});

export default AuthenticationReducer;
