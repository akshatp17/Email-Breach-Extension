const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("emails", emailSchema);
