const express = require("express");
const router = express.Router();

// Отримати всі ігри
router.get("/", (req, res) => {
    res.send("Get All games");
});

// Отримати конкретну гру за ID
router.get("/:id", (req, res) => {
    res.send(`Get single game with ID: ${req.params.id}`);
});

// Створити нову гру
router.post("/", (req, res) => {
    res.send("Create game");
});

module.exports = router;
