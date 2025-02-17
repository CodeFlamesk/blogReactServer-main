const express = require("express");
const Role = require("../models/Role");

const router = express.Router();

// 🔹 Створення нової ролі
router.post("/create", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Назва ролі обов'язкова" });

        const existingRole = await Role.findOne({ name });
        if (existingRole) return res.status(400).json({ message: "Така роль вже існує" });

        const role = new Role({ name });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Отримання списку всіх ролей
router.get("/", async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Отримання ролі за ID
router.get("/:id", async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ message: "Роль не знайдена" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Оновлення ролі
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Назва ролі обов'язкова" });

        const updatedRole = await Role.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedRole) return res.status(404).json({ message: "Роль не знайдена" });

        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Видалення ролі
router.delete("/:id", async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) return res.status(404).json({ message: "Роль не знайдена" });

        res.json({ message: "Роль успішно видалена", deletedRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
