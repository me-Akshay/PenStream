import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

/**
 * AuthContexProvider is a React component that provides authentication context to its children.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components.
 * @return {ReactNode} The rendered React component.
 */
export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // store user in local storage when current user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
