const Game = require('../models/Game')

const getGames = async (req, res) => {
    try {
        const games = await Game.find();

        res.status(200).json(games);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не вдалось получити список ігор, повторіть спробу"

            });
    }
};
/* const createGame = async (req, res) => {
    try {
        const { type, date, name, map, about, images, roles, team } = req.body;
        const game = await Game.create({
            type,
            date,
            name,
            map,
            about,
            images,
            roles,
            team
        });
        res.status(201).json(plane)
    } catch {
        res
            .status(500)
            .json({
                message: "Не вдалось створити гру, повторіть спробу"

            });
    }
} */
module.exports = {
    getGames
};