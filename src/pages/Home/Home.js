import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../../hooks/useAuthContext";
import useTheme from "../../hooks/useTheme";

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
  }, [user, navigate]);

  return <div>Home</div>;
}
