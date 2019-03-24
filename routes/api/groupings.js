const router = require("express").Router();
const groupingsController = require("../../controllers/groupingsController");

// Matches with "/api/groupings"
router.route("/")
    .get(groupingsController.findAll)
    .post(groupingsController.create);

// Matches with "/api/groupings/:id"
router
  .route("/:id")
  .get(groupingsController.findById)
  .put(groupingsController.update)
  .delete(groupingsController.remove);

module.exports = router;
