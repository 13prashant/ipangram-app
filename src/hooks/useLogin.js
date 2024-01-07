import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { backendApiUrl } from "..//lib/constants";

export default function useLogin() {
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
    }
  };

  return { login, isPending, error };
}
