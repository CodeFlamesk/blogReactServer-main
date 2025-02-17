const Game = require("../models/Game");
const Role = require("../models/Role");
const Team = require("../models/Team");
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
        const { type, date, name, map, about, roles, teams, players } = req.body;

        if (!type || !date || !name || !map || !about) {
            return res.status(400).json({ message: "Не всі обов'язкові поля заповнені" });
        }

        const gameImages = req.files ? req.files.map(file => `${API_URL}/static/${file.filename}`) : [];

        // Перетворюємо roles, teams та players на ObjectId
        const parsedRoles = roles ? JSON.parse(roles) : [];
        const roleIds = await Promise.all(parsedRoles.map(async (role) => {
            try {
                const roleDoc = await Role.findOne({ name: role.role });
                if (!roleDoc) throw new Error(`Роль ${role.role} не знайдена`);
                const userDoc = await User.findById(role.user);
                if (!userDoc) throw new Error(`Користувач з id ${role.user} не знайдений`);
                return { role: roleDoc._id, user: userDoc._id };
            } catch (err) {
                console.error(`Помилка при обробці ролей: ${err.message}`);
                throw err;
            }
        }));

        const teamIds = teams ? JSON.parse(teams) : [];
        const teamsDocs = await Promise.all(teamIds.map(async (team) => {
            try {
                const teamDoc = await Team.findById(team);
                if (!teamDoc) throw new Error(`Команда з id ${team} не знайдена`);
                return teamDoc._id;
            } catch (err) {
                console.error(`Помилка при обробці команд: ${err.message}`);
                throw err;
            }
        }));

        const playerIds = players ? JSON.parse(players) : [];
        const playersDocs = await Promise.all(playerIds.map(async (player) => {
            try {
                const userDoc = await User.findById(player);
                if (!userDoc) throw new Error(`Користувач з id ${player} не знайдений`);
                return userDoc._id;
            } catch (err) {
                console.error(`Помилка при обробці користувачів: ${err.message}`);
                throw err;
            }
        }));

        // Створюємо новий запис гри
        const game = new Game({
            type,
            date,
            name,
            map,
            about,
            roles: roleIds,
            teams: teamsDocs,
            players: playersDocs,
            gameImages,
        });

        await game.save();
        res.status(201).json(game);
    } catch (error) {
        console.error("Помилка при створенні гри:", error);
        res.status(500).json({ message: "Не вдалося створити гру, повторіть спробу", error: error.message });
    }
};


module.exports = {
    getGames,
    createGame,
};
