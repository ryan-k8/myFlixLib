import { useMemo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import useTheme from "./useTheme";

const useToast = (duration) => {
  const [, render] = useState(null);
  const { themeMode } = useTheme();

  const toastConfig = useMemo(
    () => ({
      position: "top-right",
      autoClose: duration,
      theme: themeMode,
    }),
    [themeMode, duration]
  );

  const createToast = useCallback(
    (message, type) => {
      render();
      if (type === "error") {
        toast.error(message, toastConfig);
      }

      if (type === "success") {
        toast.success(message, toastConfig);
      }

      if (!type) {
        toast.info(message, toastConfig);
      }
    },
    [toastConfig]
  );

  return { createToast };
};

export default useToast;
