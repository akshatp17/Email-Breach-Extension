const axios = require("axios");

const emailController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await axios.get(
      `https://leakcheck.net/api/public?check=${encodeURIComponent(email)}`
    );

    return res.json({ pwned: response.data.found, details: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error checking email", details: error.message });
  }
};
module.exports = emailController;
