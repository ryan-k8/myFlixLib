import { useState, useEffect } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import LibrarySideListItem from "./LibrarySideListItem";

export default function LibrarySideList({
  documents,
  onActiveMediaItem,
  isActiveMediaOpen,
}) {
  const [statusFilter, setStatusFilter] = useState("default");
  const [typeFilter, setTypeFilter] = useState("default");

  const [filteredDocs, setFilteredDocs] = useState(documents);

  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    setFilteredDocs(() => {
      if (typeFilter === "default" && statusFilter === "default") {
        return documents;
      }

      if (typeFilter !== "default" && statusFilter === "default") {
        const result = documents.filter((i) => i.type === typeFilter);
        return result;
      }

      if (statusFilter !== "default" && typeFilter === "default") {
        const result = documents.filter((i) => i.status === statusFilter);
        return result;
      }

      if (typeFilter !== "default" && statusFilter !== "default") {
        let results = documents.filter((i) => i.type === typeFilter);
        results = results.filter((i) => i.status === statusFilter);
        return results;
      }
    });
  }, [typeFilter, statusFilter, documents]);

  const handleListItemClick = (activeMediaConfig) => {
    onActiveMediaItem(activeMediaConfig);
  };

  return (
    <>
      {!(isActiveMediaOpen && screenWidth <= 768) && (
        <div className="md:w-[40%] lg:w-[37%] xl:w-[30%] p-1 lg:p-2 xl:p-3 overflow-x-hidden  overflow-y-auto">
          <div className="my-2 p-2 flex flex-col gap-2 lg:flex-row">
            <select
              onClick={(e) => setTypeFilter(e.target.value)}
              defaultValue={null}
              className="p-1.5 lg:p-3 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-xl transition outline-none ease-in-out m-0"
            >
              <option value={"default"}>Select type</option>
              <option value="tv">TV Show</option>
              <option value="movie">Movie</option>
            </select>
            <select
              onClick={(e) => setStatusFilter(e.target.value)}
              defaultValue={null}
              className=" p-1.5 lg:p-3 dark:text-white border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-xl transition outline-none ease-in-out m-0"
            >
              <option value={"default"}>Select Status</option>
              <option value="p2watch">Planning to Watch</option>
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="dropped">Dropped</option>
            </select>
          </div>
          <div className="p-1 lg:p-2 xl:p-3 mt-3.5">
            {filteredDocs &&
              filteredDocs.map((d) => (
                <LibrarySideListItem
                  key={d.mediaId}
                  dbId={d.id}
                  id={d.mediaId}
                  type={d.type}
                  title={d.title}
                  handleClick={handleListItemClick}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
