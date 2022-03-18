import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import useAuth from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();

  const logout = async () => {
    try {
      setError(null);
      setLoading(true);

      //sign the user out
      await signOut(auth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      //updateState

      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, loading, logout };
};
