import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pool from "./db.js";
import {
  generateOTP,
  sendOTPEmail,
  currentOTPs,
  generateAccessToken,
  JWT_SECRET,
} from "./utils.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is up and running" });
});

//LOGIN AND REGISTRATION ENDPOINTS

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM Users WHERE Email = ?", [
      email,
    ]);

    // Check if user exists
    if (userResult[0].length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult[0][0];
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (isPasswordValid) {
      const accessToken = generateAccessToken(user);
      res
        .status(200)
        .json({ message: "Login Successful", isPasswordValid, accessToken });
    } else {
      res.status(401).json({ message: "Invalid Credentials", isPasswordValid });
    }

    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUserResult = await pool.query(
      "SELECT * FROM Users WHERE Email = ?",
      [email],
    );

    if (existingUserResult[0].length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await pool.query(
      "INSERT INTO Users (Name, Email, PasswordHash) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );

    console.log(newUser);
    res.status(200).json({ message: "New User Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// FORGOT PASSWORD ENDPOINTS

app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const [userResult] = await pool.query("SELECT * FROM Users WHERE Email = ?", [email]);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult[0];
    const name = user.Name;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    await pool.query(
      "INSERT INTO PasswordResetOTPs (Email, OTP, ExpiresAt) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    const emailSent = await sendOTPEmail(email, otp, name);
    if (emailSent) {
      return res.status(200).json({ message: "OTP sent to email" });
    } else {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/updatepassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const [userResult] = await pool.query("SELECT * FROM Users WHERE Email = ?", [email]);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE Users SET PasswordHash = ? WHERE Email = ?", [hashedPassword, email]);

    // Clear OTPs for this email
    await pool.query("DELETE FROM PasswordResetOTPs WHERE Email = ?", [email]);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// verfication of OTP and updating new password can be implemented similarly with appropriate endpoints

app.post("/verifyotp", async (req, res) => {
  const { email, OTP } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM PasswordResetOTPs WHERE Email = ? ORDER BY ID DESC LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No OTP found" });
    }

    const { OTP: storedOtp, ExpiresAt } = rows[0];

    if (Date.now() > new Date(ExpiresAt)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOtp === OTP) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

//Restricted Profile Endpoint
app.get("/resticted-data", JWT_SECRET, async (req, res) => {
  const { email } = req.body;
  try {
    const [userResult] = await pool.query(
      "SELECT Name, Email FROM Users WHERE Email = ?",
      [email],
    );
    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = userResult[0];
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default pool;
