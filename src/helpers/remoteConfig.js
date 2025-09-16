// import remoteConfig from '@react-native-firebase/remote-config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hookHelper';

export const useRemoteConfig = () => {
  const [remoteDone, setRemoteDone] = useState(false);
  const app = useAppSelector(state => state.AppReducer.appConfig);
  const dispatch = useDispatch();

  const fetchOnly = async () => {
    
  };

  const remoteFetch = async () => {
    setRemoteDone(false);
    fetchOnly();
    setRemoteDone(true);
  };

  return {remoteDone, remoteFetch, fetchOnly};
};
