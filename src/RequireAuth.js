import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

export default function RequireAuth() {
  const { user: loggedIn } = useAuthContext();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/error"}
      replace
      state={{
        message: "You have to be logged in to access ",
        redirect: "/login",
      }}
    />
  );
}
