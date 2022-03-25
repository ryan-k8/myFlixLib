import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Search from "./Search";

export default function SearchProxy(props) {
  const { query } = useParams();
  const [queryParams] = useSearchParams();

  return <Search key={query + queryParams.get("page")} {...props} />;
}
