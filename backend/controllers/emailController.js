const emailModel = require("../models/emailModel");

const emailController = async (req, res) => {
  try {
    const email = new emailModel(req.body);
    await email.save();

    return res.status(201).send({
      success: true,
      message: "Email send successfully",

      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in email API",
      error,
    });
  }
};

module.exports = emailController;
