const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/teamController");
router.post("/", TeamController.create);

router.get("/", TeamController.getAll);

router.get("/:id", TeamController.getById);


router.put("/:id", TeamController.updatePlayers);

router.get("/:id/gameId", TeamController.getGameIdByTeamId);

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
