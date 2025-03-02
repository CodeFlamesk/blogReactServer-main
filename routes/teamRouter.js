const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/teamController");

// Створити нову команду
router.post("/", TeamController.create);

// Отримати всі команди
router.get("/", TeamController.getAll);

// Отримати команду за ID
router.get("/:id", TeamController.getById);

// Оновити список гравців у команді
router.put("/:id", TeamController.updatePlayers);

// Отримати gameId для команди
router.get("/:id/gameId", TeamController.getGameIdByTeamId);

// Видалити команду
router.delete("/:id", TeamController.delete);
router.post("/", async (req, res) => {
    console.log("Отримано запит на створення команди:", req.body);

    try {
        const team = await TeamService.add(req.body);
        res.status(201).json(team);
    } catch (error) {
        console.error("Помилка при створенні команди:", error.message);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
