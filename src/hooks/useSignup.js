import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthContext from "./useAuthContext";
import { auth } from "../firebase/config";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("could not complete signup");
      }

      await updateProfile(res.user, {
        displayName: displayName,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/myflixlib.appspot.com/o/Portrait_Placeholder.png?alt=media&token=abfc5d5a-a551-44de-9326-38c1b4f42c48",
      });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setLoading(false);
        setError(null);
        setSuccess(true);
      }
    } catch (err) {
      if (!isCancelled) {
        setLoading(false);
        setError(err.message);
        setSuccess(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { signup, loading, error, success };
};

export default useSignup;
