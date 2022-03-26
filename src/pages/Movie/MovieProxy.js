import { useParams } from "react-router-dom";
import Movie from "./Movie";

export default function SearchProxy(props) {
  const { query } = useParams();

  return <Movie key={query} {...props} />;
}
