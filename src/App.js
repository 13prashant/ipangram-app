import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
// Pages
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
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
