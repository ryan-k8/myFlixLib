import Hero from "./components/Hero";
import Row from "./components/Row";

import { MOVIEDB_URIS } from "../../api/moviedb";

export default function Home() {
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
