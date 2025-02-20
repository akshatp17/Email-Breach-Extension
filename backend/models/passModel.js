const mongoose = require("mongoose");
const passSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("pass", passSchema);
