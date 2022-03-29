import { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import Spinner from "../../../components/Spinner";
import TVSeasonDetail from "./TVSeasonDetail";
import ActiveMediaDetail from "./ActiveMediaDetail";

import { MOVIEDB_URIS } from "../../../api/moviedb";
import { detailsHelper } from "../../../utils/moviedb";

import useFetchMovieDb from "../../../hooks/useFetchMovieDb";
import useToast from "../../../hooks/useToast";
import { db } from "../../../firebase/config";

export default function LibraryActiveMedia({
  libraryDoc,
  documents,
  setActiveMediaOpen,
}) {
  const { data, loading } = useFetchMovieDb(
    MOVIEDB_URIS.detailURL(libraryDoc.type, libraryDoc.id)
  );

  const [activeDoc, setActiveDoc] = useState(
    documents.find((d) => d.id === libraryDoc.dbId)
  );

  const { createToast } = useToast(1200);

  const [mediaData, setMediaData] = useState(null);

  useEffect(() => {
    if (data) {
      const helperData = detailsHelper(data);
      setMediaData(helperData);
    }
  }, [data]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "media", libraryDoc.dbId), (snapshot) => {
      setActiveDoc({
        id: snapshot.id,
        ...snapshot.data(),
      });
    });

    return () => {
      unsub();
    };
  }, [libraryDoc.dbId]);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    try {
      if (status !== "default") {
        updateDoc(doc(db, "media", activeDoc.id), {
          status: e.target.value,
        });
        createToast("updated status successfully", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`p-1 lg:p-2 xl:p-3 md:w-[60%] lg:w-[63%] xl:w-[70%] overflow-y-auto  `}
    >
      <div className="md:hidden p-2 flex justify-center">
        <button
          onClick={() => setActiveMediaOpen(false)}
          to={"/library"}
          className="transition-colors px-3 py-2 text-lg flex items-center gap-x-2 rounded-lg text-white bg-indigo-600 dark:bg-blue-400 hover:bg-indigo-700 dark:hover:bg-blue-500"
        >
          <FaArrowCircleLeft /> Library List
        </button>
      </div>
      <ActiveMediaDetail
        filteredData={mediaData}
        handleStatusChange={handleStatusChange}
        status={activeDoc?.status}
        type={libraryDoc.type}
      />

      {libraryDoc.type === "tv" && (
        <TVSeasonDetail
          id={libraryDoc.id}
          seasons={mediaData?.seasons}
          activeDoc={activeDoc}
        />
      )}
    </div>
  );
}
