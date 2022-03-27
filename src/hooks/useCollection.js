import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../firebase/config";

const useCollection = (col, _query) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;

  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocs(results);
      },
      (err) => {
        if (err) {
          setError("couldn't fetch data");
        }
        console.log(err);
      }
    );

    return () => {
      unsub();
    };
  }, [col, q]);

  return { documents: docs, error };
};

export default useCollection;
