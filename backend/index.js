const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
dotenv.config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors());
app.use("/v1", require("./router/emailRouter"));

app.use("/v1", require("./router/passRouter"));
app.use("/v1", require("./router/urlRouter"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
