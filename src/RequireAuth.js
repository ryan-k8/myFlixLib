import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import useAuthContext from "./hooks/useAuthContext";
import useTheme from "./hooks/useTheme";

export default function RequireAuth() {
  const { user } = useAuthContext();
  const { themeMode } = useTheme();

  if (!user) {
    const toastId = "login-redirect-toast";

    if (!toast.isActive(toastId))
      toast.info("Please Login to acess page", {
        toastId: toastId,
        position: "top-right",
        autoClose: 2000,
        theme: themeMode,
      });
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}
