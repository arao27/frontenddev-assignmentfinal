import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { user, login, signup, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div style={{ padding: "16px" }}>
        <h2>Welcome, {user.username}!</h2>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = isLogin ? login(username, password) : signup(username, password);

    if (!result.success) {
      alert(result.message);
    } else {
      alert(isLogin ? "Logged in!" : "Account created!");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ marginRight: "8px" }}>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ marginRight: "8px" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button
        style={{ marginTop: "12px" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default LoginPage;