import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { backendApiUrl } from "../lib/constants";

export default function useAuth() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(`${backendApiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        // Save the user to local storage
        localStorage.setItem("IPANGRAM_USER", JSON.stringify(json.data));

        dispatch({ type: "LOGIN", payload: json.data });
      }

      setIsPending(false);
    } catch (error) {
      console.error("Error while logging in: ", error);
      setError(error.message);
    }
  };

  const register = async (role, name, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(`${backendApiUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        // Save the user to local storage
        localStorage.setItem("IPANGRAM_USER", JSON.stringify(json.data));

        dispatch({ type: "LOGIN", payload: json.data });
      }
    } catch (error) {
      console.error("Error while registering: ", error);
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${backendApiUrl}/api/v1/auth/logout`, {
        method: "GET",
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        if (json.success) {
          dispatch({ type: "LOGOUT" });

          localStorage.setItem("IPANGRAM_USER", null);
        } else {
          setError(json.error);
        }
      }
    } catch (error) {
      console.error("Error while logging out: ", error);
      setError(error.message);
    }
  };

  return { login, register, logout, isPending, error, setError };
}
