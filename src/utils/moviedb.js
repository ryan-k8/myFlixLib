import { MOVIEDB_MEDIA_CONFIG } from "../api/moviedb";

const placeholderPosterURL =
  "https://critics.io/img/movies/poster-placeholder.png";

const placeholderBackDropURL =
  "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png";

export const resultsHelper = (data, manualType) => {
  const { page, total_pages: totalPages } = data;

  let { results } = data;

  const hasPrevPage = page !== 1;
  const hasNextPage = page < parseInt(totalPages);

  results = results.map((result) => {
    let {
      id,
      name,
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      first_air_date,
      media_type: type,
    } = result;

    if (manualType && !type) {
      type = manualType;
    }

    return {
      id,
      type,
      title: title ? title : name,
      overview,
      releaseDate: release_date ? release_date : first_air_date,
      posterUrl: poster_path
        ? MOVIEDB_MEDIA_CONFIG.posterBASEURL() + poster_path
        : placeholderPosterURL,

      backdropUrl: backdrop_path
        ? MOVIEDB_MEDIA_CONFIG.backdropBaseURL() + backdrop_path
        : placeholderBackDropURL,
      link: `/${type}/${id}`,
    };
  });

  return {
    pageNo: page,
    results: results,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
  };
};

export const detailsHelper = (data) => {
  let {
    title,
    overview,
    name,
    vote_average: score,
    poster_path,
    backdrop_path,
    first_air_date,
    release_date,
    genres,
    number_of_episodes,
    number_of_seasons,
  } = data;

  genres = genres.map((g) => g.name);

  return {
    title: title ? title : name,
    overview,
    score,
    genres,
    releaseDate: release_date ? release_date : first_air_date,
    posterUrl: poster_path
      ? MOVIEDB_MEDIA_CONFIG.posterBASEURL() + poster_path
      : placeholderPosterURL,
    backdropUrl: backdrop_path
      ? MOVIEDB_MEDIA_CONFIG.backdropBaseURL() + backdrop_path
      : placeholderBackDropURL,
    seasons: number_of_seasons,
    episodes: number_of_episodes,
  };
};
