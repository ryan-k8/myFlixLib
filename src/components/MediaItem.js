import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export default function MediaItem({ title, type, posterUrl, link }) {
  const navigate = useNavigate();

  return (
    <div className="snap-start lg:snap-center p-2 sm:p-3 flex-shrink-0 ml-2 w-[240px] h-auto rounded-lg ">
      <div
        className="relative group overflow-hidden h-[80%] rounded-lg cursor-pointer"
        onClick={() => navigate(link)}
      >
        <img
          className="transition-all w-full h-full transform duration-[0.3s] ease group-hover:scale-[1.2] rounded-lg"
          src={posterUrl}
          alt={title}
        />
        <div className="flex group justify-center items-center transition-colors absolute top-0 right-0 bottom-0 left-0 group-hover:bg-black/[0.25]">
          <FaEye className="hidden transition-all text-4xl text-white group-hover:block" />
        </div>
      </div>
      <Link
        to={link}
        className="block dark:text-white mt-2 lg:text-md hover:text-indigo-600 dark:hover:text-blue-400 "
      >
        {title}
      </Link>
      <span className="border-2 border-gray-600 dark:border-white px-1  text-center text-sm font-medium dark:text-white rounded-md">
        {type.toUpperCase()}
      </span>
    </div>
  );
}
