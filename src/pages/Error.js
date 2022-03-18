import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Error() {
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeOut = setTimeout(() => {
      if (state?.redirect) {
        navigate(state.redirect);
      }
    }, 1500);

    return () => {
      clearTimeout(redirectTimeOut);
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-5">
      <h2 className="text-3xl dark:text-white text-center antialiased">
        {state?.message || "Page For Rendering Errors"}
      </h2>
    </div>
  );
}
