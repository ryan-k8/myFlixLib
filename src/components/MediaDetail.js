import { IoMdAdd, IoMdRemoveCircle } from "react-icons/io";

import { useState, useEffect } from "react";
import useFetchMovieDb from "../hooks/useFetchMovieDb";

import Spinner from "./Spinner";

import { detailsHelper } from "../utils/moviedb";
import { MOVIEDB_URIS } from "../api/moviedb";

export default function MediaDetail({ type, id }) {
  const { data, loading } = useFetchMovieDb(MOVIEDB_URIS.detailURL(type, id));

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (data) {
      const helperData = detailsHelper(data);
      setFilteredData(helperData);
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="relative w-full h-full">
        <div
          className="absolute p-3 top-0 left-0 right-0 bottom-0 shadow-lg max-h-[90%]  brightness-50  "
          style={{
            backgroundImage: `url('${filteredData?.backdropUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="relative p-3 w-full mx-auto md:w-[80%] lg:w-[75%] xl:w-[70%] z-4">
          <div className="pb-[15%] sm:pb-[20%] md:pb-[15%] lg:pb-[10%]"></div>
          <div className="transition-colors p-3 lg:p-5 xl:p-6 flex flex-col md:flex-row justify-start items-start  w-full dark:text-white bg-slate-200 dark:bg-gray-700 rounded-lg shadow-2xl">
            <div className="p-1 h-[20rem] md:h-full w-[60%]  mx-auto md:mx-0 sm:w-[35%] lg:w-[30%] xl:w-[22%]">
              <img
                className="w-full mx-auto rounded-md h-full"
                src={filteredData?.posterUrl}
                alt={filteredData?.title}
              />
            </div>
            <div className="w-full px-3 py-2">
              <div className="flex flex-col md:flex-row w-full mb-1 gap-1 justify-end">
                <button className="px-3 py-2 text-md flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400 ">
                  <IoMdAdd size={28} color="white" />
                  Add to library
                </button>
                <button className="px-2 py-1 text-md flex items-center gap-x-2 rounded-lg text-white bg-pink-700 ">
                  <IoMdRemoveCircle size={28} color="white" />
                  Remove from library
                </button>
              </div>
              <div className="p-2">
                <p className="text-2xl lg:text-4xl dark:text-white">
                  {filteredData?.title} (
                  {filteredData?.releaseDate?.slice(0, 4)})
                </p>
                <div className="p-1 flex gap-2">
                  <span className="py-1 text-sm font-semibold px-5 inline-block rounded-lg bg-yellow-400 text-black">
                    {filteredData?.score}
                  </span>

                  {type === "tv" && (
                    <>
                      <span className="py-1 text-sm font-semibold px-5 inline-block rounded-lg bg-yellow-400 text-black">
                        {filteredData?.episodes} Episodes
                      </span>
                      <span className="py-1 text-sm font-semibold px-5 inline-block rounded-lg bg-yellow-400 text-black">
                        {filteredData?.seasons} Seasons
                      </span>
                    </>
                  )}
                </div>
                <div className="p-1 flex gap-2">
                  {filteredData?.genres.map((genre) => (
                    <span
                      key={genre}
                      className="py-1 text-sm font-semibold px-3 inline-block rounded-lg bg-purple-500 text-black"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="text-md mt-3 dark:text-white">
                  {filteredData?.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
