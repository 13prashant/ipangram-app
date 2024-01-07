import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Header from "./layouts/Header";

export default function PrivateRoutes() {
  const { userData } = useAuthContext();

  return userData?.token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
