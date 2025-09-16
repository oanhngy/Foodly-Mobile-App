import { createAction, createReducer } from '@reduxjs/toolkit';

export function generateActions(prefix, action) {
  const actionName = `${prefix}/${action}`;
  const requestName = `${actionName}_REQUEST`;
  const successName = `${actionName}_SUCCESS`;
  const failedName = `${actionName}_FAILED`;
  const request = createAction(requestName);
  const success = createAction(successName);
  const failed = createAction(failedName);
  return {
    request,
    success,
    failed,
    actionName,
    failedName,
    successName,
    requestName,
  };
}
export function generateLocalAction(prefix, action) {
  const actionName = `${prefix}/${action}`;
  const request = createAction(actionName + '_LOCAL');
  return {
    request,
    actionName,
  };
}

export const handleReducerBuilder = (
  state,
  action,
) => {
  state.action = action.type;
};
export function createHandleReducer(initialState, builderCallback) {
  return createReducer(initialState, build => {
    builderCallback(build);
    build.addDefaultCase(handleReducerBuilder);
  });
}
