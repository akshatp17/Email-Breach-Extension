const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.post("/url", urlController);

module.exports = router;
