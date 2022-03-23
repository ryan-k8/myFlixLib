import React from "react";
import { FaTv } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HeroItem({ title, overview, type, backdropUrl, link }) {
  return (
    <div className="relative flex-shrink-0 snap-start  scroll-ml-3 ml-3 w-full h-[50vh] sm:h-[69vh] lg:h-[85vh] rounded-[1.2rem]  border-[3px] lg:border-[4px] border-transparent z-30  hover:bg-indigo-600 hover:dark:bg-blue-400">
      <img
        src={backdropUrl}
        className="w-full xl:mx-auto h-full rounded-[1.2rem] transition-all"
        alt={title}
      />
      <div className="absolute transition-opacity top-0 left-0 bottom-0 right-0 bg-black/[0.33] dark:bg-black/[0.4] rounded-[1.2rem]">
        <div className="flex flex-col gap-[0.22rem] justify-center h-full p-5 mt-5 xl:mt-20 mb-3">
          <h2 className="text-white text-2xl md:text-3xl lg:text-5xl  ">
            {title}
          </h2>
          <div className="flex items-center gap-x-2 ml-2 py-1 text-white text-2xl md:text-[1.3rem]">
            <FaTv className="text-white text-2xl md:text-3xl lg:text-4xl" />
            {type === "movie" ? type : "TV show"}
          </div>
          <div className="hidden md:block text-white text-lg md:text-xl  sm:w-[60%] xl:w-[50%]">
            {overview}
          </div>
          <div className="flex items-center sm:mx-3 mb-3 h-full">
            <Link
              to={link}
              className="transition-all  text-xl rounded-md px-3 py-2  flex gap-2 items-center w-40  bg-indigo-600 dark:bg-gray-800 hover:scale-105 text-white cursor-pointer"
            >
              <AiFillEye className="text-white text-2xl md:text-3xl lg:text-4xl" />
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
