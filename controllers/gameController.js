const Game = require('../models/Game');
const API_URL = process.env.API_URL || "http://localhost:5000";

const getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({
            message: "Не вдалося отримати список ігор, повторіть спробу"
        });
    }
};

const createGame = async (req, res) => {
    try {
        const { type, date, name, map, about } = req.body;

        const roles = req.body.roles ? JSON.parse(req.body.roles) : [];
        const team = req.body.team ? JSON.parse(req.body.team) : [];

        const game = await Game.create({
            type,
            date,
            name,
            map,
            about,
            roles,
            team
        });

        res.status(200).json(game);
    } catch (error) {
        console.error("Помилка при створенні гри:", error);
        res.status(500).json({
            message: "Не вдалося створити гру, повторіть спробу"
        });
    }
};

module.exports = {
    getGames,
    createGame
};
