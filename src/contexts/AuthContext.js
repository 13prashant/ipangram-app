import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userData: action.payload };

    case "LOGOUT":
      return { userData: null };

    case "IS_AUTH_READY":
      return { userData: action.payload, isAuthReady: true };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userData: null,
    isAuthReady: false,
  });

  console.log("AuthContext state: ", state);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("IPANGRAM_USER"));

    if (userData) {
      dispatch({ type: "IS_AUTH_READY", payload: userData });
    } else {
      dispatch({ type: "IS_AUTH_READY", payload: null });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
