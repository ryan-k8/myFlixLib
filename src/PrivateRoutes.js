import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function PrivateRoutes() {
  const { loggedIn, checkingAuthStatus } = useAuth();
  const { pathname } = useLocation();

  const loggedOutURIs = ["/login", "/signup"];

  if (checkingAuthStatus) {
    return (
      <div className="w-[100vw] mt-[-5rem] text-2xl font-bold flex dark:text-white h-[100vh] text-black justify-center items-center">
        Checking Auth...
      </div>
    );
  }

  if (loggedIn && loggedOutURIs.includes(pathname)) {
    return (
      <Navigate
        to={"/error"}
        replace
        state={{ message: "Already Logged In !!!", redirect: "/" }}
      />
    );
  }

  if (!loggedIn && loggedOutURIs.includes(pathname)) {
    return <Outlet />;
  }

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
