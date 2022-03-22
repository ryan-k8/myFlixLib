import { useEffect } from "react";

import Spinner from "../../../components/Spinner";

import useToast from "../../../hooks/useToast";
import useFetchMovieDb from "../../../hooks/useFetchMovieDb";

import { resultsHelper } from "../../../utils/moviedb";
import MediaItem from "../../../components/MediaItem";

export default function Row({ title, source, type }) {
  const { data, loading, error } = useFetchMovieDb(source);

  let rowData;
  if (data) {
    rowData = resultsHelper(data, type).results;
  }

  const { createToast } = useToast(1500);

  useEffect(() => {
    if (error) {
      createToast(error, "error");
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-2 py-3 xl:p-5 my-5 ">
      <h2 className="text-xl sm:text-2xl md:text-3xl my-2 lg:text-4xl dark:text-white">
        {title}
      </h2>
      <div className="flex p-2 scroll-pl-3 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide ">
        {rowData &&
          rowData.map((item) => (
            <MediaItem
              key={item.id}
              title={item.title}
              type={item.type}
              posterUrl={item.posterUrl}
              link={item.link}
            />
          ))}
      </div>
    </div>
  );
}
