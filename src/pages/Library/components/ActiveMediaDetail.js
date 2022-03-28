export default function ActiveMediaDetail({ filteredData, type }) {
  return (
    <div className="p-2 md:p-3 xl:p-6 w-full text-center md:text-left">
      <div className="lg:pl-3">
        <p className="text-2xl lg:text-4xl dark:text-white">
          {filteredData?.title} ({filteredData?.releaseDate?.slice(0, 4)})
        </p>
        <div className="my-3 w-full">
          <img
            className="max-h-[300px] mx-auto rounded-lg md:mx-0 "
            src={filteredData?.posterUrl}
            alt={filteredData?.title}
          />
        </div>
        <div className="p-1 flex gap-2 justify-center md:justify-start flex-wrap">
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
        <div className="p-1 flex gap-2 flex-wrap justify-center md:justify-start">
          {filteredData?.genres.map((genre) => (
            <span
              key={genre}
              className="py-1 text-sm font-semibold px-3 rounded-lg bg-purple-500 text-black"
            >
              {genre}
            </span>
          ))}
        </div>
        <select
          defaultValue={null}
          className="p-1.5 lg:py-2 my-2 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-xl transition outline-none ease-in-out m-0 text-start"
        >
          <option value={"default"}>Change Status</option>
          <option value="p2watch">Planning to Watch</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>
        <p className="text-md lg:text-lg mt-3 dark:text-white">
          {filteredData?.overview}
        </p>
      </div>
    </div>
  );
}
