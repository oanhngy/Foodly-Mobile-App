import { ReduxHelper } from '../../helpers';

export const prefix = 'APP';
export const setConfig = ReduxHelper.generateLocalAction(prefix, 'SET_CONFIG');
export const setDeviceId = ReduxHelper.generateLocalAction(prefix, 'SET_DEVICE_ID');
export const setServerDown = ReduxHelper.generateLocalAction(prefix, 'SET_SERVER_DOWN');