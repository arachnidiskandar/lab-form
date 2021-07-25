import axios from 'axios';
import React, { useEffect, useReducer, useRef } from 'react';

const actions = {
  FETCHING: (state) => ({ loading: true, error: null, fetchedData: state.fetchedData }),
  SUCCESS: (state, fetchedData) => ({
    loading: false,
    error: null,
    fetchedData,
  }),
  ERROR: (state) => ({ loading: false, error: true, fetchedData: state.fetchedData }),
};

const reducer = (state, { type, fetchedData }) => {
  const handler = actions[type];
  return handler ? handler(state, fetchedData) : state;
};

const useFetch = (url) => {
  const cache = useRef({});
  const [{ loading, fetchedData, error }, dispatch] = useReducer(reducer, {
    loading: false,
    fetchedData: [],
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'FETCHING' });
    if (cache.current[url]) {
      const data = cache.current[url];
      dispatch({ type: 'SUCCESS', data });
    }
    try {
      const { data } = await axios.get(url);
      cache.current[url] = data;
      dispatch({ type: 'SUCCESS', fetchedData: data });
    } catch (e) {
      console.log('entrei error');
      dispatch({ type: 'ERROR', error: e.message });
    }
  };

  useEffect(() => {
    let cancelRequest = false;
    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return [loading, fetchedData, error];
};

export default useFetch;
