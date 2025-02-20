const crypto = require("crypto");
const passModel = require("../models/passModel");
const axios = require("axios");
async function isPasswordPwned(password) {
  const hash = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  try {
    const response = await axios.get(
      `https://api.pwnedpasswords.com/range/${prefix}`
    );
    const hashes = response.data.split("\n").map((line) => line.split(":")[0]);

    return hashes.includes(suffix);
  } catch (error) {
    console.error("Error checking password:", error.message);
    throw new Error("Failed to check password.");
  }
}

const passController = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const pwned = await isPasswordPwned(password);
    return res.json({
      password,
      pwned,
      message: pwned
        ? "⚠️ This password has been pwned!"
        : "✅ This password is safe.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = passController;
