const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

const { markSubSectionAsCompleted } = require("../controllers/CourseProgressC");

router.post(
  "/marksubsectionascompleted",
  protect,
  authorize("Student"),
  markSubSectionAsCompleted
);

module.exports = router;
