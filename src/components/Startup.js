import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./Spinner";

export default function Startup({ children }) {
  const { authIsReady } = useAuthContext();

  if (!authIsReady) {
    return <Spinner />;
  }

  return <>{children}</>;
}
