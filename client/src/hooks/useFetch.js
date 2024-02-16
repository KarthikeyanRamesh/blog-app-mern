import { useState, useEffect } from "react";

export function useFetch(callbackFunction) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isInProgress, setIsInProgress] = useState(true);
  const [isError, setIsError] = useState(false);

  async function executeCallback() {
    return callbackFunction();
  }

  useEffect(() => {
    setTimeout(() => {
      executeCallback()
        .then((res) => {
          if (!res.ok) {
            throw new Error("could not complete the task");
          }
          return res.json();
        })
        .then((data) => {
          setIsInProgress(false);
          setError(null);
          setIsError(false);
          setData(data);
        })
        .catch((err) => {
          setData(null);
          setError(err);
          setIsError(true);
          setIsInProgress(false);
        });
    }, 3000);
  }, []);

  return {
    isInProgress,
    isError,
    error,
    data,
  };
}
