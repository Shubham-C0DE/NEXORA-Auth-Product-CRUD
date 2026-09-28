import {
  createContext,
  useState,
} from "react";

import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [user, setUser] = useState(null);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setAccessToken(accessToken);
  };

  const fetchMe = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      console.log("Fetch user error:", error);

      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setAccessToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        login,
        logout,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};