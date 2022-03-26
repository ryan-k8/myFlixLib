import { useParams } from "react-router-dom";
import TV from "./TV";

export default function SearchProxy(props) {
  const { query } = useParams();

  return <TV key={query} {...props} />;
}
