import React, { useState } from "react";

import Spinner from "../../components/Spinner";
import LibrarySideList from "./components/LibrarySideList";

import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import LibraryActiveMedia from "./components/LibraryActiveMedia";

export default function Library() {
  const { user } = useAuthContext();

  const { documents } = useCollection("media", ["uid", "==", user.uid]);

  const [activeMediaOpen, setActiveMediaOpen] = useState(false);

  const [libraryDoc, setLibraryDoc] = useState(null);

  const onActiveMediaItem = (config) => {
    setActiveMediaOpen(true);
    setLibraryDoc(config);
  };

  if (!documents) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col md:flex-row  md:h-[calc(100vh-140px)] lg:h-[calc(100vh-78px)]">
      <LibrarySideList
        documents={documents}
        isActiveMediaOpen={activeMediaOpen}
        onActiveMediaItem={onActiveMediaItem}
      />
      {activeMediaOpen && (
        <LibraryActiveMedia
          key={libraryDoc.dbId}
          setActiveMediaOpen={setActiveMediaOpen}
          libraryDoc={libraryDoc}
          documents={documents}
        />
      )}
    </div>
  );
}
