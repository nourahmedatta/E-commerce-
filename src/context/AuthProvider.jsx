import { useState } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "currentUser";

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = (userData) => {
    // Never keep the password in the session object
    const { password: _password, ...safeUser } = userData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
