const Router = require("express");
const router = new Router();
const { body } = require("express-validator");

const teamRoleController = require("../controllers/teamRoleController");

// Створення нової ролі
router.post("/roles",
    body("gamerole").notEmpty().withMessage("Роль не може бути порожньою"),
    teamRoleController.createRole
);

// Отримання всіх ролей
router.get("/roles", teamRoleController.getRoles);

module.exports = router;
