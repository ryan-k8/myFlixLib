import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const API_DEFAULT_PARAMS = {
  api_key: process.env.REACT_APP_TMDB_API_KEY,
};

export const MOVIEDB_URIS = {
  trendingURL: "/trending/all/week?page=1",
  popularURL: (type) => `/${type}/popular?page=1`,
  searchURL: (query, page) => `/search/multi?query=${query}&page=${page}`,
  detailURL: (type, id) => `/${type}/${id}`,
};
