import { useParams } from "react-router-dom";
import MediaDetail from "../../components/MediaDetail";

export default function TV() {
  const { id } = useParams();

  return (
    <>
      <MediaDetail id={id} key={id} type="tv" />
    </>
  );
}
