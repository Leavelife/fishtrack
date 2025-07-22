import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    try {
      if (token && token.split(".").length === 3) {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setRole(decoded.role);
      } else {
        setIsLoggedIn(false);
        setRole("");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      setIsLoggedIn(false);
      setRole("");
    }
  }, []);

  const login = (role) => {
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
