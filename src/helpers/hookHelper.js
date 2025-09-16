import {useTheme} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {useLoadingContext} from './loadingHelper';

export const useBaseHook = () => {
  const {theme} = useTheme();
  const {showLoading, hideLoading} = useLoadingContext();
  const dispatch = useDispatch();
  return {
    theme,
    dispatch,
    showLoading,
    hideLoading,
  };
};
export const useGetNavigation = () => {
  let route;
  route = useRoute();
  const navigation = useNavigation();
  return {
    navigation,
    route,
  };
};

// const store = configureStore().store;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
