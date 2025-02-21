// routes/teamRouter.js
const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const { ObjectId } = require("mongoose").Types;

// POST: Створення нової команди
router.post("/", async (req, res) => {
    const { color, players } = req.body;

    try {
        // Перевірка, що players є масивом
        if (!Array.isArray(players)) {
            return res.status(400).json({ message: "Players має бути масивом" });
        }

        // Перевірка валідності кожного ID у players
        const invalidPlayers = players.filter((player) => !ObjectId.isValid(player));
        if (invalidPlayers.length > 0) {
            return res.status(400).json({ message: "Невірні ID гравців", invalidPlayers });
        }

        // Створення нової команди з players як масивом ObjectId
        const newTeam = new Team({
            color,
            players: players.map((player) => new ObjectId(player))
        });

        // Збереження команди в базі даних
        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        console.error("Помилка при створенні команди:", error);
        res.status(500).json({ message: "Помилка при створенні команди", error });
    }
});

// PUT: Оновлення ролей (players) в команді
router.put("/:teamId", async (req, res) => {
    const { teamId } = req.params;
    const { players } = req.body;

    try {
        // Перевірка, що players є масивом
        if (!Array.isArray(players)) {
            return res.status(400).json({ message: "Players має бути масивом" });
        }

        // Перевірка валідності кожного ID у players
        const invalidPlayers = players.filter((player) => !ObjectId.isValid(player));
        if (invalidPlayers.length > 0) {
            return res.status(400).json({ message: "Невірні ID гравців", invalidPlayers });
        }

        // Оновлення команди з новим масивом players
        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $set: { players: players.map((player) => new ObjectId(player)) } },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: "Команда не знайдена" });
        }

        res.json(updatedTeam);
    } catch (error) {
        console.error("Помилка при оновленні команди:", error);
        res.status(500).json({ message: "Помилка при оновленні команди", error });
    }
});

module.exports = router;
