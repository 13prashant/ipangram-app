import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
// Pages
import AuthLayout from "./components/layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/departments" element={<Departments />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
