const bodyParser = require("body-parser");
const axios = require("axios");
const PHISHING_DETECTION_API = "https://api.phishing-detector.com/check";

function checkPhishingEmail(emailContent) {
  const phishingKeywords = [
    "password",
    "account",
    "verify",
    "login",
    "urgent",
    "immediately",
    "suspicious",
    "bank",
    "paypal",
    "credit card",
    "social security",
  ];

  const suspiciousLinks = ["http://", "https://", "click here"];

  let isPhishing = false;

  // Check for phishing keywords
  phishingKeywords.forEach((keyword) => {
    if (emailContent.toLowerCase().includes(keyword)) {
      isPhishing = true;
    }
  });

  // Check for suspicious links
  suspiciousLinks.forEach((link) => {
    if (emailContent.toLowerCase().includes(link)) {
      isPhishing = true;
    }
  });

  return isPhishing;
}
const mailController = async (req, res) => {
  const { mailcon } = req.body;

  if (!mailcon) {
    return res.status(400).json({ error: "Email content is required" });
  }

  const isPhishing = await checkPhishingEmail(mailcon);

  return res.json({
    isPhishing,
    message: isPhishing
      ? "⚠️ This is a suspicious email!"
      : "✅ This is a safe email.",
  });
};

module.exports = mailController;
