import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import useToast from "../../../hooks/useToast";

import TVEpisodeItem from "./TVEpisodeItem";

import moviedbapi, {
  API_DEFAULT_PARAMS,
  MOVIEDB_MEDIA_CONFIG,
} from "../../../api/moviedb";
import { MOVIEDB_URIS } from "../../../api/moviedb";
import { db } from "../../../firebase/config";

export default function TVSeasonDetail({ id, seasons, activeDoc }) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasonURL = useMemo(
    () => MOVIEDB_URIS.seasonURL(id, selectedSeason),
    [selectedSeason, id]
  );

  const { createToast } = useToast(1000);

  const [seasonData, setSeasonData] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleEpisodeItemClick = ({ epNo, watched, seasonNo }) => {
    let selectedSeason = activeDoc[seasonNo];

    if (!selectedSeason) {
      selectedSeason = seasonData.episodes.map((_, i) => {
        if (epNo === i + 1) {
          return { epNo: i + 1, watched };
        }
        return { epNo: i + 1, watched: false };
      });
    } else {
      selectedSeason = selectedSeason.map((e) => {
        if (e.epNo === epNo) {
          return { epNo: epNo, watched: watched };
        }

        return e;
      });

      /* episode was added newly to the season */
      const epInUserList = selectedSeason.find((e) => e.epNo === epNo);
      if (!epInUserList) {
        selectedSeason.push({ epNo: epNo, watched: watched });
      }
    }
    const updateObject = {};
    updateObject[seasonNo] = selectedSeason;

    updateDoc(doc(db, "media", activeDoc.id), updateObject);
    createToast("changed status !", "success");
  };

  useEffect(() => {
    async function FetchSeasonData() {
      let { data: result } = await moviedbapi.get(seasonURL, {
        params: {
          ...API_DEFAULT_PARAMS,
        },
      });

      const episodes = result.episodes.map((ep) => {
        return {
          id: ep.id,
          name: ep.name,
          episodeUrl: MOVIEDB_MEDIA_CONFIG.stillBaseURL() + ep.still_path,
          score: ep.vote_average,
        };
      });

      return {
        episodes,
        seasonNumber: result.season_number,
      };
    }
    FetchSeasonData().then((res) => {
      setSeasonData(res);
    });

    return () => {
      setSeasonData([]);
    };
  }, [seasonURL]);
  return (
    <>
      <div className="p-1 md:p-3 lg:p-5 ">
        <div className="md:pl-3 flex justify-center md:justify-start">
          <select
            defaultValue={selectedSeason}
            onChange={handleSelectChange}
            className="p-1.5 lg:py-2 my-2 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-xl transition outline-none ease-in-out m-0 text-start"
          >
            {Array.apply(null, { length: seasons }).map((e, i) => (
              <option key={i} value={i + 1}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="p-1 md:p-2 lg:p-3 w-full flex flex-col justify-start gap-2 md:gap-3 lg:gap-3.5">
          {seasonData?.episodes &&
            seasonData.episodes.map((e, index) => (
              <TVEpisodeItem
                key={e.id}
                episode={e}
                number={index + 1}
                season={selectedSeason}
                handleEpisodeItemClick={handleEpisodeItemClick}
                watchedData={activeDoc[selectedSeason]?.find(
                  (e) => e.epNo === index + 1
                )}
              />
            ))}
        </div>
      </div>
    </>
  );
}
