import { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

import Spinner from "../../../components/Spinner";

import { MOVIEDB_URIS } from "../../../api/moviedb";
import { detailsHelper } from "../../../utils/moviedb";

import useFetchMovieDb from "../../../hooks/useFetchMovieDb";
import ActiveMediaDetail from "./ActiveMediaDetail";
import TVSeasonDetail from "./TVSeasonDetail";

export default function LibraryActiveMedia({ libraryDoc, setActiveMediaOpen }) {
  const { data, loading } = useFetchMovieDb(
    MOVIEDB_URIS.detailURL(libraryDoc.type, libraryDoc.id)
  );

  const [mediaData, setMediaData] = useState(null);

  useEffect(() => {
    if (data) {
      const helperData = detailsHelper(data);
      setMediaData(helperData);
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`p-1 lg:p-2 xl:p-3 md:w-[60%] lg:w-[63%] xl:w-[70%] overflow-y-auto  `}
    >
      <div className="md:hidden p-2 flex justify-center">
        <button
          onClick={() => setActiveMediaOpen(false)}
          to={"/library"}
          className="transition-colors px-3 py-2 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400 hover:bg-indigo-700 dark:hover:bg-blue-500"
        >
          <FaArrowCircleLeft /> Library List
        </button>
      </div>
      <ActiveMediaDetail filteredData={mediaData} type={libraryDoc.type} />

      {libraryDoc.type === "tv" && (
        <TVSeasonDetail id={libraryDoc.id} seasons={mediaData?.seasons} />
      )}
    </div>
  );
}
