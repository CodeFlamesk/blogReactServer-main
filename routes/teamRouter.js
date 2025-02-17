const express = require("express");
const Team = require("../models/Team");
const User = require("../models/User");
const Role = require("../models/Role");

const router = express.Router();

// 🔹 Створення команди
router.post("/create", async (req, res) => {
    try {
        const { name } = req.body;
        const team = new Team({ name, members: [] });
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Додавання учасника до команди
router.post("/:teamId/add-member", async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ message: "Команда не знайдена" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Користувач не знайдений" });

        const role = await Role.findById(roleId);
        if (!role) return res.status(404).json({ message: "Роль не знайдена" });

        // Перевіряємо, чи юзер вже в команді
        const isAlreadyMember = team.members.some(member => member.user.equals(userId));
        if (isAlreadyMember) {
            return res.status(400).json({ message: "Користувач вже в команді" });
        }

        team.members.push({ user: userId, role: roleId });
        await team.save();

        res.json({ message: "Учасника додано до команди", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Отримання списку команд
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find().populate("members.user members.role");
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
