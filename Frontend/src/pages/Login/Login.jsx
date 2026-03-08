import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import "../auth-shared.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateFieldData(fieldName, newValue) {
    setError("");
    setUserDetails((prev) => ({ ...prev, [fieldName]: newValue }));
  }

  async function submitUserDetails() {
    setError("");
    setLoading(true);
    try {
      const response = await axiosClient.post("/login", userDetails);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submitUserDetails();
  }

  return (
    <div className="auth-page">

      {/* ── Left visual panel ── */}
      <div className="auth-visual">
        <div className="auth-visual-brand">
          <div className="brand-icon">🔐</div>
          <span className="brand-name">AuthSystem</span>
        </div>

        <div className="auth-visual-content">
          <div className="auth-visual-eyebrow">
            <span className="auth-visual-dot" />
            Secure Access
          </div>

          <h1 className="auth-visual-heading">
            Welcome<br />
            <span className="gold-word">back.</span>
          </h1>

          <p className="auth-visual-desc">
            Sign in to your account. Your session is protected
            by JWT authentication with industry-standard encryption.
          </p>

          <div className="auth-trust-list">
            <div className="auth-trust-item">
              <div className="trust-icon">🔒</div>
              Passwords hashed with bcrypt (10 rounds)
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">🎫</div>
              JWT tokens with 1-hour session expiry
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">🛡️</div>
              CORS-protected, HTTPS-ready endpoints
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-header">
          <h2 className="auth-form-title">Sign in</h2>
          <p className="auth-form-subtitle">Enter your credentials to access your account.</p>
        </div>

        <div className="auth-form" onKeyDown={handleKeyDown}>

          {error && (
            <div className="status-box error">
              <span className="status-icon">⚠</span>
              {error}
            </div>
          )}

          <div className="field-group">
            <label className="field-label">Email address</label>
            <input
              type="email"
              className="field-input"
              placeholder="you@example.com"
              value={userDetails.email}
              onChange={(e) => updateFieldData("email", e.target.value)}
              autoComplete="email"
            />
            <span className="field-hint">We'll never share your email with anyone.</span>
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="••••••••"
              value={userDetails.password}
              onChange={(e) => updateFieldData("password", e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            className="auth-btn-primary"
            onClick={submitUserDetails}
            disabled={loading}
          >
            <span className="btn-inner">
              {loading && <span className="spinner" />}
              {loading ? "Signing in…" : "Sign in"}
            </span>
          </button>
        </div>

        <div className="auth-nav-links">
          <p>
            <Link to="/forgotpassword" className="auth-link">Forgot your password?</Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/" className="auth-link">Create one</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
