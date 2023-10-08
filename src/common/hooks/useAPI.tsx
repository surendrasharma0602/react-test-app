import { useEffect, useState } from "react";
import { RequestState } from "../enums";
import axios, { AxiosError } from "axios";

const useAPI = <T,>(url: string) => {
  const [fetchingState, setFetchingState] = useState(RequestState.NONE);
  const [result, setResult] = useState<T>();
  const [refreshIndex, setRefreshIndex] = useState(0); // to force refresh
  const [error, setError] = useState<Error>();

  const refresh = () => setRefreshIndex(refreshIndex + 1); // allow to trigger useEffect

  useEffect(() => {
    setFetchingState(RequestState.IN_PROGRESS);
    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get<T>(url, { signal })
      .then((r) => {
        setResult(r.data);
        setFetchingState(RequestState.SUCCESS);
      })
      .catch((e: AxiosError) => {
        // check axios error handling doc for best usage
        setError(e);
        setFetchingState(RequestState.ERROR);
      });

    return () => {
      console.log(`Request aborted : ${url} `);
      controller.abort();
    };
  }, [url, refreshIndex]);

  return { result, fetchingState, error, refresh };
};

export default useAPI;
