import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(" useAuth must be used inside AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
