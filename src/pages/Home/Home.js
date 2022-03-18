import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

export default function Home() {
  const { loggedIn } = useAuth();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  if (!loggedIn) {
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

  return <div>Home</div>;
}
