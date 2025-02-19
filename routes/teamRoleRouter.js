const Router = require("express");
const router = new Router();
const TeamRoleController = require("../controllers/teamRoleController");
const { body, param } = require("express-validator");

router.post("/", body("gameRole").isString().notEmpty(), TeamRoleController.add);
router.get("/", TeamRoleController.getAll);
router.get("/:id", param("id").isMongoId(), TeamRoleController.getById);

module.exports = router;
