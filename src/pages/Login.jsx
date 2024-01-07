import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData?.token) {
      navigate("/");
    }
  }, [navigate, userData]);

  return (
    <main>
      <section className="h-screen grid place-items-center">
        <LoginForm />
      </section>
    </main>
  );
}
