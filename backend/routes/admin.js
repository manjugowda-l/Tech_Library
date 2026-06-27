const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_PASSWORD= process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error("ADMIN_PASSWORD and JWT_SECRET must be set in environment variables.");
}

router.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.json({ token, admin: true });
});

module.exports = router;
