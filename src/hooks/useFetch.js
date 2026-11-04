import { useReducer, useEffect } from 'react';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useFetch(fetchFn, dependencies = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const data = await fetchFn(controller.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_FAILURE', payload: err.message });
        }
      }
    }

    getData();

    return () => {
      controller.abort();
    };
  }, dependencies);

  return state;
}
