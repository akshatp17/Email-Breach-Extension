const express = require("express");
const mailController = require("../controllers/mailcontroller");

const router = express.Router();

router.post("/pmail", mailController);

module.exports = router;
