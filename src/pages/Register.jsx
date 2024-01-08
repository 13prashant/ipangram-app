import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import RegisterForm from "../components/register/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData?.token) {
      navigate("/");
    }
  }, [navigate, userData]);

  return (
    <section className="h-screen grid place-items-center">
      <RegisterForm />
    </section>
  );
}
