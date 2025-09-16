import React from 'react';
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
export const LoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };
  const value = React.useMemo(() => ({
    loading,
    showLoading,
    hideLoading,
  }), [loading]);
  return (
    <LoadingContext.Provider value={value}>
      {props.children}
    </LoadingContext.Provider>
  );
};
