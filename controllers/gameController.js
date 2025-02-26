const Game = require("../models/Game");
const Role = require("../models/Role");
const Team = require("../models/TeamRole");
const User = require("../models/User");
const API_URL = process.env.API_URL || "http://localhost:5000";

const getGames = async (req, res) => {
    try {
        const games = await Game.find().populate("roles.role players teams");
        res.status(200).json(games);
    } catch (error) {
        console.error("Помилка при отриманні ігор:", error);
        res.status(500).json({ message: "Не вдалося отримати список ігор, повторіть спробу" });
    }
};

const createGame = async (req, res) => {
    try {
        const { type, date, name, map, about } = req.body;

        if (!type || !date || !name || !map || !about) {
            return res.status(400).json({ message: "Не всі обов'язкові поля заповнені" });
        }

        const gameImages = req.files && Array.isArray(req.files) ? req.files.map(file => `${API_URL}/static/${file.filename}`) : [];

        // Створюємо новий запис гри
        const game = new Game({
            type,
            date,
            name,
            map,
            about,
            gameImages,
        });

        await game.save();
        res.status(201).json(game);
    } catch (error) {
        console.error("Помилка при створенні гри:", error);
        res.status(500).json({ message: "Не вдалося створити гру, повторіть спробу" });
    }
};



const getGameIdByParams = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id).select("_id");

        if (!game) {
            return res.status(404).json({ message: "Гра не знайдена" });
        }

        res.status(200).json({ _id: game._id });
    } catch (error) {
        console.error("Помилка при отриманні ID гри:", error);
        res.status(500).json({ message: "Не вдалося отримати ID гри" });
    }
};

module.exports = {
    getGames,
    createGame,
    getGameIdByParams,
};