// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const { user, login, signup, logout, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <div className="login-page">Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await signup(email, password, username);
    }

    if (!result.success) {
      // Display error inline instead of alert
      alert(result.message);
    }

    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="login-page">
      {user ? (
        <div className="logged-in">
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an account" : "Already have an account? Login"}
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;