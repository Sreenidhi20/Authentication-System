import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import "../auth-shared.css";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", OTP: "", newPassword: "" });
  const [OTPSentStatus, setOTPSentStatus] = useState(false);
  const [OTPVerified, setOTPVerified]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState("");

  function updateFieldData(fieldName, newValue) {
    setError(""); setSuccess("");
    setUserDetails((prev) => ({ ...prev, [fieldName]: newValue }));
  }

  // Step label helpers
  const step = OTPVerified ? 3 : OTPSentStatus ? 2 : 1;

  async function sendOTP() {
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosClient.post("/forgotpassword", { email: userDetails.email });
      if (response.status === 200) {
        setOTPSentStatus(true);
        setSuccess("OTP sent! Check your inbox.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not send OTP. Please check the email and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    setError("");
    if (!userDetails.OTP.trim() || userDetails.OTP.trim().length !== 6) {
      setError("Please enter the 6-digit OTP sent to your email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosClient.post("/verifyotp", {
        email: userDetails.email,
        OTP: userDetails.OTP,
      });
      if (response.status === 200) {
        setOTPVerified(true);
        setSuccess("Identity verified. Set your new password below.");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function UpdateNewPassword() {
  if (!userDetails.newPassword) {
    alert("Please enter a new password.");
    return;
  }
  if (userDetails.newPassword.length < 6) {
    alert("Password should be at least 6 characters long.");
    return;
  }

  try {
    const response = await axiosClient.post("/updatepassword", {
      email: userDetails.email,
      newPassword: userDetails.newPassword,
    });

    if (response.status === 200) {
      alert("New Password Updated Successfully");
      navigate("/login");
    } else {
      alert(response.data.message || "Failed to update password.");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating password. Please try again.");
  }
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
            Account Recovery
          </div>

          <h1 className="auth-visual-heading">
            Reset your<br />
            <span className="gold-word">password.</span>
          </h1>

          <p className="auth-visual-desc">
            We'll send a 6-digit OTP to your email to verify your identity.
            Once verified, you can set a new password securely.
          </p>

          <div className="auth-trust-list">
            <div className="auth-trust-item">
              <div className="trust-icon">📧</div>
              OTP delivered via secured Gmail SMTP
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">⏱️</div>
              Codes are temporary and single-use
            </div>
            <div className="auth-trust-item">
              <div className="trust-icon">🔒</div>
              New password hashed with bcrypt on save
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-header">
          <h2 className="auth-form-title">Forgot password</h2>
          <p className="auth-form-subtitle">Follow the steps below to recover access to your account.</p>
        </div>

        {/* Step progress indicator */}
        <div className="otp-progress">
          <div className="otp-step">
            <div className={`otp-step-num ${step >= 1 ? (step > 1 ? "done" : "active") : ""}`}>
              {step > 1 ? "✓" : "1"}
            </div>
            <span className={`otp-step-label ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>Email</span>
          </div>
          <div className={`otp-connector ${step > 1 ? "done" : ""}`} />
          <div className="otp-step">
            <div className={`otp-step-num ${step >= 2 ? (step > 2 ? "done" : "active") : ""}`}>
              {step > 2 ? "✓" : "2"}
            </div>
            <span className={`otp-step-label ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>Verify OTP</span>
          </div>
          <div className={`otp-connector ${step > 2 ? "done" : ""}`} />
          <div className="otp-step">
            <div className={`otp-step-num ${step === 3 ? "active" : ""}`}>3</div>
            <span className={`otp-step-label ${step === 3 ? "active" : ""}`}>New Password</span>
          </div>
        </div>

        <div className="auth-form">

          {error && (
            <div className="status-box error">
              <span className="status-icon">⚠</span>
              {error}
            </div>
          )}

          {success && (
            <div className="status-box success">
              <span className="status-icon">✓</span>
              {success}
            </div>
          )}

          {/* Step 1 — Email */}
          {!OTPSentStatus && (
            <>
              <div className="field-group">
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={userDetails.email}
                  onChange={(e) => updateFieldData("email", e.target.value)}
                  autoComplete="email"
                  onKeyDown={(e) => e.key === "Enter" && sendOTP()}
                />
                <span className="field-hint">Enter the email linked to your account.</span>
              </div>

              <button className="auth-btn-primary" onClick={sendOTP} disabled={loading}>
                <span className="btn-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Sending OTP…" : "Send OTP"}
                </span>
              </button>
            </>
          )}

          {/* Step 2 — OTP verification */}
          {OTPSentStatus && !OTPVerified && (
            <>
              <div className="field-group">
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  className="field-input"
                  value={userDetails.email}
                  disabled
                />
              </div>

              <div className="field-group">
                <label className="field-label">6-digit OTP</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="123456"
                  maxLength={6}
                  value={userDetails.OTP}
                  onChange={(e) => updateFieldData("OTP", e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && verifyOTP()}
                  autoFocus
                />
                <span className="field-hint">Check your inbox — the code expires shortly.</span>
              </div>

              <button className="auth-btn-primary" onClick={verifyOTP} disabled={loading}>
                <span className="btn-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Verifying…" : "Verify OTP"}
                </span>
              </button>

              <button
                className="auth-btn-secondary"
                onClick={() => { setOTPSentStatus(false); setSuccess(""); }}
                disabled={loading}
              >
                ← Change email
              </button>
            </>
          )}

          {/* Step 3 — New password */}
          {OTPSentStatus && OTPVerified && (
            <>
              <div className="field-group">
                <label className="field-label">New password</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Min. 6 characters"
                  value={userDetails.newPassword}
                  onChange={(e) => updateFieldData("newPassword", e.target.value)}
                  autoComplete="new-password"
                  onKeyDown={(e) => e.key === "Enter" && UpdateNewPassword()}
                  autoFocus
                />
                <span className="field-hint">Choose a strong password you haven't used before.</span>
              </div>

              <button className="auth-btn-primary" onClick={UpdateNewPassword} disabled={loading}>
                <span className="btn-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Updating…" : "Update password"}
                </span>
              </button>
            </>
          )}

        </div>

        <div className="auth-nav-links">
          <p>
            Remember your password?{" "}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
          <p>
            New here?{" "}
            <Link to="/" className="auth-link">Create an account</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
