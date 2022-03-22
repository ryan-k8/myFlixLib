import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuthContext from "../../hooks/useAuthContext";
import useTheme from "../../hooks/useTheme";

import Hero from "./components/Hero";
import Row from "./components/Row";

import { MOVIEDB_URIS } from "../../api/moviedb";

export default function Home() {
  const { user } = useAuthContext();

  const { themeMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const toastId = "login-redirect-toast";

      navigate("/login");

      if (!toast.isActive(toastId))
        toast.info("Please Login to acess page", {
          toastId: toastId,
          position: "top-right",
          autoClose: 2000,
          theme: themeMode,
        });
    }
  }, [user, navigate, themeMode]);

  return (
    <>
      <section className="pt-1 px-2 pb-2 h-full">
        <div className="container mx-auto">
          <Hero source={MOVIEDB_URIS.trendingURL} />
          <Row
            title={"Popular Movies"}
            type={"movie"}
            source={MOVIEDB_URIS.popularURL("movie")}
          />
          <Row
            title={"Popular TV Shows"}
            type={"tv"}
            source={MOVIEDB_URIS.popularURL("tv")}
          />
        </div>
      </section>
    </>
  );
}
