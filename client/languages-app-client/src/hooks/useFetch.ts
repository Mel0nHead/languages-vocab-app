import { useState, useEffect } from "react";

// TODO: add better typings
export function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData((currentData: any) => (!signal.aborted ? json : currentData));
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
  }, [url, options]);

  return { data, error, loading };
}
