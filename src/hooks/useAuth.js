import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);

  const context = useContext(AuthContext);
  const { user, authIsReady } = context;

  if (!context) {
    throw new Error(" useAuth must be used inside AuthContextProvider");
  }

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingAuthStatus(false);
  }, [user]);

  return { user, authIsReady, loggedIn, checkingAuthStatus };
};

export default useAuth;
