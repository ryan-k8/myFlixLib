import { useEffect } from "react";

import Spinner from "../../../components/Spinner";

import useToast from "../../../hooks/useToast";
import useFetchMovieDb from "../../../hooks/useFetchMovieDb";

import { resultsHelper } from "../../../utils/moviedb";
import HeroItem from "./HeroItem";

export default function Hero({ source }) {
  const { data, loading, error } = useFetchMovieDb(source);

  let trendingData;
  if (data) {
    trendingData = resultsHelper(data).results.slice(0, 5);
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
    <div className="flex p-2 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide  rounded-lg">
      {trendingData &&
        trendingData.map((item) => (
          <HeroItem
            key={item.id}
            title={item.title}
            type={item.type}
            backdropUrl={item.backdropUrl}
            overview={item.overview}
            link={item.link}
          />
        ))}
    </div>
  );
}
