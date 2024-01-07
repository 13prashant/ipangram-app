import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userData: action.payload };

    case "LOGOUT":
      return { userData: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userData: null,
  });

  console.log("AuthContext state: ", state);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("IPANGRAM_USER"));

    if (userData) {
      dispatch({ type: "LOGIN", payload: userData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
