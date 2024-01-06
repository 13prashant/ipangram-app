import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const token = true;

  return token ? <Outlet /> : <Navigate to="/login" />;
}
