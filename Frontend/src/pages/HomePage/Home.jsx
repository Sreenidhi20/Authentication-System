import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    setMounted(true);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="home-container">

      {/* ── Header ── */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🔐</div>
            <h1 className="app-logo">AuthSystem</h1>
            <span className="logo-badge">Secure</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign out
          </button>
        </div>
      </header>

      <main className="home-main">

        {/* ── Hero ── */}
        <section className="hero-section">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Live Session Active
          </div>
          <h1 className="hero-title">
            Secure <span className="gold-word">Authentication</span><br/>
            Infrastructure
          </h1>
          <p className="hero-subtitle">
            A production-grade full-stack authentication system with JWT tokens,
            OTP verification, and bcrypt password security.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10x</div>
              <div className="stat-label">Bcrypt Rounds</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1hr</div>
              <div className="stat-label">Token Expiry</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6-digit</div>
              <div className="stat-label">OTP Codes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">JWT</div>
              <div className="stat-label">Auth Standard</div>
            </div>
          </div>
        </section>

        {/* ── Welcome ── */}
        <section className="welcome-section">
          <div className="welcome-card">
            <h2>You're authenticated & protected</h2>
            <p>
              Your session is secured by a signed JWT token. This dashboard demonstrates
              industry-standard authentication practices — from bcrypt password hashing
              to email-based OTP verification — with security engineered at every layer.
            </p>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Overview</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title">Project Architecture</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            A full-stack web application demonstrating secure authentication patterns.
          </p>
          <div className="overview-body">
            <p>
              This <strong>Authentication System</strong> is a full-stack application demonstrating
              secure user authentication and authorization using modern web technologies. The system
              implements best practices for security, including <strong>password hashing</strong>, <strong>JWT tokens</strong>,
              email verification via OTP, and protected route management on both the client
              and server. Designed to serve as both a functional product and a reference
              implementation for enterprise-grade auth flows.
            </p>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Stack</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <span className="tech-card-icon">⚛️</span>
              <h3>Frontend</h3>
              <ul>
                <li><strong>React.js</strong> — UI Framework</li>
                <li><strong>React Router</strong> — Client-side Routing</li>
                <li><strong>Bootstrap</strong> — Responsive Components</li>
                <li><strong>Axios</strong> — HTTP Client</li>
                <li><strong>localStorage</strong> — Token Persistence</li>
              </ul>
            </div>
            <div className="tech-card">
              <span className="tech-card-icon">🖥️</span>
              <h3>Backend</h3>
              <ul>
                <li><strong>Node.js</strong> — Runtime Environment</li>
                <li><strong>Express.js</strong> — Web Framework</li>
                <li><strong>MySQL</strong> — Relational Database</li>
                <li><strong>Bcrypt</strong> — Password Hashing</li>
                <li><strong>JWT</strong> — Token Authentication</li>
              </ul>
            </div>
            <div className="tech-card">
              <span className="tech-card-icon">🔒</span>
              <h3>Security & Services</h3>
              <ul>
                <li><strong>Nodemailer</strong> — Email Delivery</li>
                <li><strong>CORS</strong> — Origin Access Control</li>
                <li><strong>dotenv</strong> — Secret Management</li>
                <li><strong>OTP</strong> — One-Time Passwords</li>
                <li><strong>SSL/TLS</strong> — Encrypted Transport</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Capabilities</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Core Features</h2>
          <div className="features-grid">
            {[
              { icon: "📝", title: "User Registration", desc: "New accounts created with email and password. Passwords are hashed with <strong>bcrypt</strong> using 10 salt rounds before database storage. Email format validated on both ends." },
              { icon: "🔑", title: "Secure Login", desc: "Credentials compared against stored bcrypt hashes. On successful authentication a <strong>JWT token</strong> is signed and issued with a 1-hour expiry window." },
              { icon: "🛡️", title: "JWT Authentication", desc: "JSON Web Tokens contain the user email and ID. Stored in localStorage and sent via the <strong>Authorization: Bearer</strong> header on every protected request." },
              { icon: "🔐", title: "Protected Routes", desc: "Frontend guards check localStorage before rendering. Backend <strong>verifies every token</strong> on protected endpoints — no token, no access." },
              { icon: "🔄", title: "Password Reset", desc: "Forgotten passwords recovered via email OTP. A 6-digit code is generated, emailed, verified, then the new bcrypt-hashed password is saved to the database." },
              { icon: "📧", title: "Email Verification", desc: "<strong>Nodemailer</strong> + Gmail SMTP dispatches HTML-formatted OTP emails with TLS handling and retry logic for reliable, secure delivery." },
            ].map(({ icon, title, desc }) => (
              <div className="feature-card" key={title}>
                <div className="feature-icon-wrap">{icon}</div>
                <h3>{title}</h3>
                <p dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Auth Flow ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Flow</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Authentication Flow</h2>
          <div className="flow-track">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Registration</h4>
                <p>Name, email, password entered → password hashed → user record saved to DB</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Login</h4>
                <p>Email & password submitted → bcrypt comparison → JWT token generated & returned</p>
              </div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Protected Access</h4>
                <p>Token stored → attached to every request → server validates → access granted</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Security ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Security</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Security Measures</h2>
          <div className="security-grid">
            {[
              { icon: "🔐", label: "Password Hashing", desc: "Bcrypt with 10 salt rounds — passwords are one-way hashed and never stored in plain text." },
              { icon: "🎫", label: "JWT Tokens", desc: "Tokens signed with a secret key, scoped with 1-hour expiry, and validated on every request." },
              { icon: "📧", label: "Email OTP", desc: "6-digit randomly generated code for password reset, held in memory — never persisted to disk." },
              { icon: "🛡️", label: "CORS Protection", desc: "Cross-Origin Resource Sharing configured to permit specified, trusted origins only." },
              { icon: "✅", label: "Input Validation", desc: "All inputs sanitized and validated on both frontend and backend with regex and length constraints." },
              { icon: "🌐", label: "Secure Transport", desc: "TLS/SSL certificate handling, HTTPS-ready, and secure email via Gmail SMTP with TLS." },
            ].map(({ icon, label, desc }) => (
              <div className="security-item" key={label}>
                <div className="security-item-icon">{icon}</div>
                <div>
                  <h4>{label}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Database ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Database</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Schema Design</h2>
          <div className="schema-wrapper">
            <div className="schema-header">
              <div className="schema-dots">
                <div className="schema-dot red" />
                <div className="schema-dot yellow" />
                <div className="schema-dot green" />
              </div>
              <span className="schema-filename">schema.sql — Users table</span>
            </div>
            <pre className="schema-code">{`CREATE TABLE Users (
  ID           INT PRIMARY KEY AUTO_INCREMENT,
  Name         VARCHAR(100),
  Email        VARCHAR(100) UNIQUE NOT NULL,
  PasswordHash VARCHAR(150) NOT NULL,
  CreatedAt    DATETIME DEFAULT NOW()
);`}</pre>
            <div className="schema-fields">
              {[
                { name: "ID", desc: "Auto-increment primary key" },
                { name: "Name", desc: "Full display name" },
                { name: "Email", desc: "Unique login identifier" },
                { name: "PasswordHash", desc: "bcrypt-hashed secret" },
                { name: "CreatedAt", desc: "Account creation timestamp" },
              ].map(({ name, desc }) => (
                <div className="schema-field" key={name}>
                  <div className="field-name">{name}</div>
                  <div className="field-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Endpoints ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">API</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>API Endpoints</h2>
          <div className="endpoints-grid">
            {[
              { method: "POST", path: "/register", body: "{ name, email, password }", response: "User created confirmation" },
              { method: "POST", path: "/login", body: "{ email, password }", response: "JWT token + user data" },
              { method: "POST", path: "/forgotpassword", body: "{ email }", response: "OTP dispatched to email" },
              { method: "POST", path: "/verifyotp", body: "{ email, OTP }", response: "OTP verification result" },
              { method: "POST", path: "/updatepassword", body: "{ email, newPassword }", response: "Password update status" },
              { method: "GET", path: "/home", body: "Authorization: Bearer <token>", response: "Protected user payload" },
            ].map(({ method, path, body, response }) => (
              <div className="endpoint-card" key={path}>
                <span className={`endpoint-method ${method === "GET" ? "method-get" : "method-post"}`}>{method}</span>
                <h4>{path}</h4>
                <p><strong>{method === "GET" ? "Header" : "Body"}:</strong> {body}</p>
                <p><strong>Returns:</strong> {response}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Journey ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">User Journey</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>End-to-End User Flow</h2>
          <div className="journey-grid">
            {[
              { step: 1, title: "New User Registration", desc: "User navigates to signup, enters name, email, and password. System validates, hashes the password with bcrypt, and persists the record." },
              { step: 2, title: "User Login", desc: "Email and password submitted. Backend compares against the bcrypt hash. On success, a JWT is signed and returned to the client." },
              { step: 3, title: "Token Storage", desc: "Frontend stores the JWT in localStorage. An Axios interceptor auto-attaches it to every subsequent request via the Authorization header." },
              { step: 4, title: "Protected Route Access", desc: "Client checks localStorage before rendering. Server validates the token on every hit. Absent or expired tokens redirect to login." },
              { step: 5, title: "Forgot Password", desc: "User enters email, system generates a 6-digit OTP and delivers it via Nodemailer + Gmail SMTP. User enters the code to verify identity." },
              { step: 6, title: "Password Reset", desc: "After OTP verification, the new password is hashed and saved. User is redirected to login and can authenticate with the new credentials." },
              { step: 7, title: "Logout", desc: "Logout button clears the JWT from localStorage and redirects to login. Session is terminated immediately on the client side." },
              { step: 8, title: "Session Expiry", desc: "JWTs expire after 1 hour. Expired tokens cause a 401 response, prompting the user to re-authenticate and receive a fresh token." },
            ].map(({ step, title, desc }) => (
              <div className="journey-card" key={step}>
                <div className="journey-step-num">{step}</div>
                <h4>Step {step}: {title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Best Practices ── */}
        <section className="section-shell">
          <div className="section-header">
            <span className="section-label">Best Practices</span>
            <div className="section-line" />
          </div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>Engineering Standards</h2>
          <div className="practices-grid">
            {[
              { label: "Input Validation", desc: "All user inputs validated on both frontend and backend with regex patterns and length restrictions." },
              { label: "Password Security", desc: "Passwords hashed with bcrypt (10 rounds), never stored in plain text, compared securely at login." },
              { label: "Error Handling", desc: "Comprehensive try-catch coverage with descriptive error messages and correct HTTP status codes." },
              { label: "Loading States", desc: "Buttons disabled during API requests with loading indicators to prevent duplicate submissions." },
              { label: "Environment Variables", desc: "All sensitive data — API keys, secrets — stored in .env files, never committed to version control." },
              { label: "CORS Configuration", desc: "CORS properly scoped to allow only authorized origins, protecting against cross-origin attacks." },
              { label: "Token Management", desc: "JWTs with enforced expiry, stored in localStorage, sent via Authorization: Bearer on every request." },
              { label: "Route Protection", desc: "Frontend guards token before navigation; backend validates on every protected endpoint hit." },
            ].map(({ label, desc }) => (
              <div className="practice-item" key={label}>
                <div className="practice-check">✓</div>
                <div><strong>{label}:</strong> {desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer-section">
          <div className="footer-logo">AuthSystem</div>
          <div className="footer-tagline">Secure · Scalable · Professional</div>
          <div className="footer-pills">
            <span className="footer-pill">React</span>
            <span className="footer-pill">Node.js</span>
            <span className="footer-pill">MySQL</span>
            <span className="footer-pill">JWT</span>
            <span className="footer-pill">bcrypt</span>
          </div>
          <p className="footer-credits">© 2026 Authentication System — Built with React &amp; Node.js</p>
        </footer>

      </main>
    </div>
  );
}

export default Home;
