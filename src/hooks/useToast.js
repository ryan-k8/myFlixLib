import { toast } from "react-toastify";

import useTheme from "./useTheme";

const useToast = (duration) => {
  const { themeMode } = useTheme();

  const toastConfig = {
    position: "top-right",
    autoClose: duration,
    theme: themeMode,
  };

  const createToast = (message, type) => {
    if (type === "error") {
      toast.error(message, toastConfig);
    }

    if (type === "success") {
      toast.success(message, toastConfig);
    }

    if (!type) {
      toast.info(message, toastConfig);
    }
  };

  return { createToast };
};

export default useToast;
