import { useState, useEffect } from "react";
import moviedb, { API_DEFAULT_PARAMS } from "../api/moviedb";

const useFetchMovieDb = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await moviedb.get(url, {
          signal: controller.signal,
          params: { ...API_DEFAULT_PARAMS },
        });

        if (!isCancelled) {
          setLoading(false);
          setData(res.data);
          setError(null);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch was aborted");
        } else {
          if (!isCancelled) {
            setLoading(false);
            setError("couldn't fetch data");
          }
          console.log(err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
      setIsCancelled(true);
    };
  }, [url, isCancelled]);

  return { data, loading, error };
};

export default useFetchMovieDb;
