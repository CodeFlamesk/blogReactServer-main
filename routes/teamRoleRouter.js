const express = require("express");
const router = express.Router();
const TeamRole = require("../models/TeamRole");


router.post("/", async (req, res) => {
    const { role, user, teamId } = req.body;
    try {
        const newTeamRole = new TeamRole({
            gameRole: [{ role, user }]
        });

        const savedTeamRole = await newTeamRole.save();
        res.status(201).json(savedTeamRole);
    } catch (error) {
        console.error("Помилка при створенні ролі:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
