import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import "../auth-shared.css";
import "./Registration.css";

export default function Signup() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateFieldData(fieldName, newValue) {
    setError("");
    setUserDetails((prev) => ({ ...prev, [fieldName]: newValue }));
  }

  async function submitUserDetails() {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!userDetails.password || userDetails.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosClient.post("/register", userDetails);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("An account with this email already exists.");
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
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
            Get Started
          </div>

          <h1 className="auth-visual-heading">
            Create your<br />
            <span className="gold-word">account.</span>
          </h1>

          <p className="auth-visual-desc">
            Join thousands of users with a secure account.
            Your credentials are protected with bcrypt hashing
            and never stored in plain text.
          </p>

          <div className="auth-trust-list">
            <div className="auth-trust-item">
              <div className="trust-icon">🔒</div>
              Password hashed with bcrypt before storage
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">📧</div>
              Email-based OTP for account recovery
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">✅</div>
              Input validated on both client and server
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-header">
          <h2 className="auth-form-title">Create account</h2>
          <p className="auth-form-subtitle">Fill in your details to get started. It only takes a moment.</p>
        </div>

        <div className="auth-form" onKeyDown={handleKeyDown}>

          {error && (
            <div className="status-box error">
              <span className="status-icon">⚠</span>
              {error}
            </div>
          )}

          <div className="field-group">
            <label className="field-label">Full name</label>
            <input
              type="text"
              className="field-input"
              placeholder="Jane Smith"
              value={userDetails.name}
              onChange={(e) => updateFieldData("name", e.target.value)}
              autoComplete="name"
            />
          </div>

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
              placeholder="Min. 6 characters"
              value={userDetails.password}
              onChange={(e) => updateFieldData("password", e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            className="auth-btn-primary"
            onClick={submitUserDetails}
            disabled={loading}
          >
            <span className="btn-inner">
              {loading && <span className="spinner" />}
              {loading ? "Creating account…" : "Create account"}
            </span>
          </button>
        </div>

        <div className="auth-nav-links">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
