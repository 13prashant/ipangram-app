import { Outlet } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <main>
      <Outlet />
    </main>
  );
}
