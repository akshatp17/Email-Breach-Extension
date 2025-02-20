const express = require("express");
const passController = require("../controllers/passController");

const router = express.Router();

router.post("/pass", passController);

module.exports = router;
