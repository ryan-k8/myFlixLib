import { useReducer, useState, useEffect } from "react";
import movieDb, { API_DEFAULT_PARAMS } from "../api/moviedb";

const initialState = {
  searchResults: null,
  detailData: null,
  seasonData: null,
  trendingData: null,
  popularMovies: null,
  popularTVShows: null,
  loading: false,
  error: null,
  success: false,
};

const doneState = {
  loading: false,
  error: null,
  success: true,
};

const movieDbReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, success: false };

    case "SEARCH_DONE":
      return {
        ...state,
        searchResults: action.payload,
        ...doneState,
      };

    case "TRENDING_DONE":
      return {
        ...state,
        trendingData: action.payload,
        ...doneState,
      };

    case "DETAIL_DONE":
      return {
        ...state,
        detailData: action.payload,
        loading: false,
        error: null,
        success: true,
      };

    case "SEASON_DONE":
      return {
        ...state,
        seasonData: action.payload,
        ...doneState,
      };

    case "POPULAR_TV_DONE":
      return {
        ...state,
        popularTVShows: action.payload,
        ...doneState,
      };

    case "POPULAR_MOVIE_DONE":
      return {
        ...state,
        popularMovies: action.payload,
        ...doneState,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
      };

    default:
      return state;
  }
};

const useMovieDb = () => {
  const [response, dispatch] = useReducer(movieDbReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const searchMovieOrTVShow = async (query, page) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await movieDb.get("/search/multi", {
        params: {
          ...API_DEFAULT_PARAMS,
          query,
          page: page || 1,
        },
      });

      dispatchIfNotCancelled({ type: "SEARCH_DONE", payload: response.data });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "couldn't fetch data",
      });
    }
  };

  const getTrending = async () => {
    dispatch({ type: "LOADING" });

    try {
      const response = await movieDb.get("/trending/all/week", {
        params: {
          ...API_DEFAULT_PARAMS,
          page: 1,
        },
      });

      dispatchIfNotCancelled({ type: "TRENDING_DONE", payload: response.data });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "couldn't fetch data",
      });
    }
  };

  const getDetails = async (type, id) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await movieDb.get(`/${type}/${id}`, {
        params: {
          ...API_DEFAULT_PARAMS,
        },
      });

      dispatchIfNotCancelled({ type: "DETAIL_DONE", payload: response.data });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "couldn't fetch data",
      });
    }
  };

  const getTVShowSeasonDetails = async (id, sno) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await movieDb.get(`/tv/${id}/season/${sno}`, {
        params: {
          ...API_DEFAULT_PARAMS,
        },
      });

      dispatchIfNotCancelled({ type: "SEASON_DONE", payload: response.data });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "couldn't fetch data",
      });
    }
  };

  const getPopular = async (type) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await movieDb.get(`/${type}/popular`, {
        params: {
          ...API_DEFAULT_PARAMS,
          page: 1,
        },
      });

      dispatchIfNotCancelled({
        type: `POPULAR_${type.toUpperCase()}_DONE`,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "couldn't fetch data for popular",
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    searchMovieOrTVShow,
    getTrending,
    getDetails,
    getTVShowSeasonDetails,
    getPopular,
    response,
  };
};

export default useMovieDb;
