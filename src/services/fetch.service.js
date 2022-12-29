import { useEffect, useState } from "react";

export const useGetFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [err, setError] = useState();
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_SERVER_URL + url);
          const data = await response.json();
          if(response.status >= 400) {
            setError(data.errors);
          } else {
            setData(data);
          }
          setLoading(false);
        } catch(err) {
          setLoading(false);
          setError(err);
        }
      }
      getData();
    }, [url]);
    return { loading, data, err };
  }