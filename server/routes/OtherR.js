const express = require("express");
const router = express.Router();

const { contactUs } = require("../controllers/OtherC");

router.post("/contactus", contactUs);

module.exports = router;
