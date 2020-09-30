import { useState, useEffect } from "react";

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const stringifiedOptions = JSON.stringify(options);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData((currentData) => (!signal.aborted ? json : currentData));
      } catch (e) {
        setError((currentError) => (!signal.aborted ? e : currentError));
      } finally {
        setLoading((currentLoading) =>
          !signal.aborted ? false : currentLoading
        );
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, stringifiedOptions]);

  return { data, error, loading };
}
