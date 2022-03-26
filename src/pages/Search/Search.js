import { useState, useEffect } from "react";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { MOVIEDB_URIS } from "../../api/moviedb";
import MediaItem from "../../components/MediaItem";
import Spinner from "../../components/Spinner";
import useFetchMovieDb from "../../hooks/useFetchMovieDb";
import useToast from "../../hooks/useToast";
import { resultsHelper } from "../../utils/moviedb";

export default function Search() {
  const { query } = useParams();

  const [queryParams] = useSearchParams();

  const [page] = useState(queryParams.get("page") || 1);

  const [filteredResults, setFilteredResults] = useState(null);

  const [typeFilter, setTypeFilter] = useState(null);

  let { data, loading, error } = useFetchMovieDb(
    MOVIEDB_URIS.searchURL(query, page ? page : 1)
  );

  useEffect(() => {
    if (data) {
      let helperData = resultsHelper(data);
      helperData.results = helperData.results.filter(
        (r) => r.type !== "person"
      );
      setFilteredResults(helperData);

      if (typeFilter) {
        helperData.results = helperData.results.filter((r) => {
          if (typeFilter === "default") {
            return true;
          } else {
            return r.type === typeFilter;
          }
        });
        setFilteredResults(helperData);
      }
    }
  }, [typeFilter, data]);

  const { createToast } = useToast();

  useEffect(() => {
    if (error) {
      createToast(error, "error");
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center p-3 my-2">
      <div className="container">
        <div className="p-3 flex  flex-col md:flex-row  gap-3 justify-start md:justify-evenly items-center  w-full md:w-[80%] lg:w-[70%] mx-auto">
          <select
            defaultValue={null}
            onClick={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-[25%] p-3 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-xl transition outline-none ease-in-out m-0"
          >
            <option value={"default"}>Select type</option>
            <option value="tv">TV Show</option>
            <option value="movie">Movie</option>
          </select>
          <div className="flex gap-2">
            {filteredResults?.hasPrevPage && (
              <Link
                to={"/search/" + query + "?page=" + (page - 1)}
                className="px-4 py-3 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400"
              >
                <BiSkipPrevious size={28} />
                Prev Page
              </Link>
            )}
            {filteredResults?.hasNextPage && (
              <Link
                to={"/search/" + query + "?page=" + (parseInt(page) + 1)}
                className="px-4 py-3 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400"
              >
                <BiSkipNext size={28} /> Next Page
              </Link>
            )}
          </div>
        </div>
        <p className="text-3xl text-center dark:text-white p-1 my-2">
          (
          {filteredResults?.results?.length
            ? filteredResults.results.length
            : 0}
          ) Results
        </p>
        <div className="p-3 w-full md:w-90 mx-auto  place-items-center grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
          {filteredResults &&
            filteredResults.results.map((item) => (
              <MediaItem
                key={item.id}
                type={item.type}
                title={item.title}
                posterUrl={item.posterUrl}
                link={item.link}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
