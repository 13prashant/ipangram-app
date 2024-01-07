import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function PrivateRoutes() {
  const { userData } = useAuthContext();

  return userData?.token ? <Outlet /> : <Navigate to="/login" />;
}
