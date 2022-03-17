import { useState } from "react";

const useTheme = () => {
  const mode = window.localStorage.getItem("themeMode");

  const [themeMode, setThemeMode] = useState(mode || "light");

  const changeTheme = (mode) => {
    setThemeMode(mode);
    window.localStorage.setItem("themeMode", mode);
  };

  return { themeMode, changeTheme };
};

export default useTheme;
