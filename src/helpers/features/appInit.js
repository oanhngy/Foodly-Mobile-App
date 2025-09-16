import { useEffect, useState } from "react";
import { useRemoteConfig } from "../remoteConfig";

export const useAppInIt = () => {
  const { remoteDone, remoteFetch } = useRemoteConfig();
  const [isDone, setIsDone] = useState(false);

  const initData = async () => {};
  useEffect(() => {
    if (remoteDone) {
      setIsDone(true);
    }
  }, []);
  return { isDone, initData, remoteFetch };
};
