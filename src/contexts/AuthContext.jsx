import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current logged-in user
  const [users, setUsers] = useState({}); // all registered users

  // Load users and current user from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) setUsers(JSON.parse(storedUsers));

    const current = localStorage.getItem("currentUser");
    if (current) setUser(JSON.parse(current));
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    if (users[username] && users[username].password === password) {
      setUser(users[username]);
      localStorage.setItem("currentUser", JSON.stringify(users[username]));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signup = (username, password) => {
    if (users[username]) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = { username, password };
    const updatedUsers = { ...users, [username]: newUser };
    setUsers(updatedUsers);

    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};