import { createContext, useContext, useState } from "react";

// Dummy auth: no backend. `user` is just an object kept in React state.
// Roles: "student" | "organizer" | "admin"
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = ({ name, email, role }) =>
    setUser({ name: name || email.split("@")[0], email, role });

  const logout = () => setUser(null);

  // Demo helper so you can preview every role's UI quickly
  const switchRole = (role) => setUser((u) => (u ? { ...u, role } : u));

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
