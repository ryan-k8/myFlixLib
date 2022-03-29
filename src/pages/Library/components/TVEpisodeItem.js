import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function TVEpisodeItem({
  episode,
  number,
  season,
  handleEpisodeItemClick,
  watchedData,
}) {
  return (
    <div className="transition-all p-1 lg:p-2 flex flex-row bg-slate-100 dark:bg-gray-700 rounded-lg shadow-md md:hover:scale-105">
      <img
        className=" w-[40%] md:w-[35%] lg:w-[30%] rounded-lg"
        src={episode.episodeUrl}
        alt={episode.name}
      />
      <div className="pl-2 lg:pl-6 py-2 mb-2">
        <p className="text-md lg:text-xl dark:text-white">
          ({number}) {episode.name}
        </p>
        <span className="p-1 text-sm font-semibold max-w-[2rem] text-center block my-1 rounded-lg bg-yellow-400 text-black">
          {Math.round(episode.score)}
        </span>
        {watchedData?.watched && (
          <AiFillEyeInvisible
            size={25}
            onClick={() =>
              handleEpisodeItemClick({
                epNo: number,
                seasonNo: season,
                watched: false,
              })
            }
            className="transition text-red-600 dark:text-red-400 my-2 cursor-pointer hover:scale-110"
          />
        )}
        {!watchedData?.watched && (
          <AiFillEye
            onClick={() =>
              handleEpisodeItemClick({
                epNo: number,
                seasonNo: season,
                watched: true,
              })
            }
            size={25}
            className="transition text-green-500  my-2 cursor-pointer hover:scale-110"
          />
        )}
      </div>
    </div>
  );
}
