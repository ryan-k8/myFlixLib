import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const API_DEFAULT_PARAMS = {
  api_key: process.env.REACT_APP_TMDB_API_KEY,
};
