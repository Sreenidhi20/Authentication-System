import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AppEMail,
    pass: process.env.AppPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email, otp, name) => {
  try {
    console.log(`Sending OTP ${otp} to email: ${email}`);

    await transporter.sendMail({
      from: process.env.AppEMail,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #ffffff; background-color: #4CAF50; padding: 10px 20px; border-radius: 6px;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p>If you did not request a password reset, please ignore this email or contact support immediately.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #777; text-align: center;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `,
    });

    console.log("OTP email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};



const accessTokenSecret = process.env.AccessTokenSecret;

export function generateAccessToken(user) {
  return jwt.sign({ email: user.Email, id: user.ID }, accessTokenSecret, { expiresIn: "1h" });
}

export const JWT_SECRET = (req,res,next)=>{
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  token = token.split(" ")[1]; // Assuming token is in the format "Bearer <token>"
  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}