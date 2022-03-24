import { useEffect, useState, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";
import moviedb, {
  MOVIEDB_URIS,
  API_DEFAULT_PARAMS,
  MOVIEDB_MEDIA_CONFIG,
} from "../api/moviedb";
import useToast from "../hooks/useToast";

export default function SearchBox({ mobile, value, changeValue }) {
  const [typeStyles] = useState(
    mobile ? "w-full lg:hidden mt-3" : "  hidden lg:block w-[339px] "
  );
  const [searchResBoxOpen, setSearchResBoxOpen] = useState(false);
  const searchBoxRef = useRef();
  const [searchResults, setSearchResults] = useState(null);
  const debouncedSearchTerm = useDebounce(value, 450);
  const navigate = useNavigate();
  const { createToast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "" || value.length < 3) {
      createToast("search query cannot be empty", "error");
      return;
    }

    navigate("/search" + value);
    changeValue("");
  };

  useEffect(() => {
    async function fetchSearchResults(query) {
      try {
        const results = await moviedb.get(MOVIEDB_URIS.searchURL(query, 1), {
          params: { ...API_DEFAULT_PARAMS },
        });

        return results.data?.results;
      } catch (err) {
        console.log(err);
      }
    }

    if (debouncedSearchTerm) {
      setSearchResBoxOpen(true);
      fetchSearchResults(debouncedSearchTerm).then((results) => {
        results = results.filter((i) => i.media_type !== "person");
        let finalResults = results.length < 1 ? null : results.slice(0, 3);

        if (finalResults) {
          finalResults = finalResults.map((result) => {
            return {
              id: result.id,
              title: result.title ? result.title : result.name,
              type: result.media_type,
              link: `/${result.media_type}/${result.id}`,
              image: MOVIEDB_MEDIA_CONFIG.posterBASEURL() + result.poster_path,
            };
          });
        }
        setSearchResults(finalResults);
      });
    }
  }, [debouncedSearchTerm]);

  const closeSearchResBox = () => {
    setSearchResBoxOpen(false);
  };

  const handleClickOutside = useCallback((event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      closeSearchResBox();
    } else {
      setSearchResBoxOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={searchBoxRef}
      className={`relative transition all p-1 border-[1.6px] dark:border-[2.3px] min-h-[40px] bg-white border-black dark:border-gray-400 hover:border-indigo-600 dark:hover:border-blue-400 rounded-[25px] ${typeStyles}`}
    >
      <form onSubmit={onSubmit} className="flex items-center h-full w-full p-2">
        <FaSearch size={20} className />
        <input
          type="text"
          value={value}
          onChange={(e) => changeValue(e.target.value)}
          className="pl-3 w-full outline-none w-90"
          placeholder="search"
        />
      </form>
      {debouncedSearchTerm && searchResBoxOpen && (
        <div className="absolute transition-all p-3 left-0 right-0 mt-3 bg-slate-50 dark:bg-gray-800 dark:text-white z-[600] rounded shadow-lg">
          {!searchResults ? (
            "No results :("
          ) : (
            <div className="flex flex-col gap-y-3">
              {searchResults.map((item) => (
                <SmallMediaItem
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  type={item.type}
                  link={item.link}
                />
              ))}
              <Link
                to={"/search/" + debouncedSearchTerm}
                className="transition-colors block text-white w-full text-center  py-3 rounded bg-indigo-600 dark:bg-blue-400 hover:bg-indigo-500 dark:hover:bg-blue-500"
              >
                View All Results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SmallMediaItem = ({ title, image, type, link }) => {
  return (
    <div className="p-2 transition rounded flex hover:bg-slate-200 dark:hover:bg-gray-700 justify-start items-center gap-x-2 h-[125px] lg:h-auto width-full">
      <img
        className="w-[30%] md:w-[15%] sm:w-[20%] lg:w-[25%] h-[100%] shadow-md rounded-md hover:animate-pulse"
        src={image}
        alt={title}
      />
      <div className="self-start">
        <Link
          to={link}
          className="text-md block transition dark:text-white self-start hover:text-indigo-600 dark:hover:text-blue-400 mb-2"
        >
          {title}
        </Link>
        <span className="p-[2px] px-[3px] border-[1px] text-sm border-black dark:border-white text-md dark:text-white rounded-md">
          {type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
