import { useParams } from "react-router-dom";
import MediaDetail from "../../components/MediaDetail";

export default function Movie() {
  const { id } = useParams();

  return (
    <>
      <MediaDetail id={id} key={id} type="movie" />
    </>
  );
}
