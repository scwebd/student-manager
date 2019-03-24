const router = require("express").Router();
const studentRoutes = require("./students");
const groupingRoutes = require("./groupings");

router.use("/students", studentRoutes);
router.use("/groupings", groupingRoutes);

module.exports = router;
