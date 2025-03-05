const Team = require("../models/Team");
const ApiError = require("../exceptions/apiError");
const { ObjectId } = require("mongoose").Types;

class TeamService {
    async add({ color, players, game }) {
        if (!color) {
            throw ApiError.BadRequest("Колір є обов'язковим");
        }
        if (!Array.isArray(players)) {
            throw ApiError.BadRequest("Players має бути масивом");
        }
        if (players.some(player => !ObjectId.isValid(player))) {
            throw ApiError.BadRequest("Невірні ID гравців");
        }
        if (!game || !ObjectId.isValid(game)) {
            throw ApiError.BadRequest("Невірний ID гри");
        }

        try {
            const newTeam = new Team({
                color,
                players: players.map(player => new ObjectId(player)),
                game: new ObjectId(game) // ID гри зберігається правильно
            });
            return await newTeam.save();
        } catch (e) {
            throw ApiError.BadRequest("Команду не створено: " + e.message);
        }
    }


    async getAll(filter = {}) {
        try {
            return await Team.find(filter).populate("players game").lean();
        } catch (e) {
            throw ApiError.BadRequest("Не вдалося отримати всі команди: " + e.message);
        }
    }



    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest("ID команди не передано");
        }
        try {
            const team = await Team.findById(id).populate("players game");
            if (!team) {
                throw ApiError.BadRequest("Команду не знайдено");
            }
            return team;
        } catch (e) {
            throw ApiError.BadRequest("Помилка при отриманні команди: " + e.message);
        }
    }

    async updatePlayers(id, players) {
        if (!id) {
            throw ApiError.BadRequest("ID команди не передано");
        }
        if (!Array.isArray(players)) {
            throw ApiError.BadRequest("Players має бути масивом");
        }
        if (players.some(player => !ObjectId.isValid(player))) {
            throw ApiError.BadRequest("Невірні ID гравців");
        }

        try {
            const updatedTeam = await Team.findByIdAndUpdate(
                id,
                { $set: { players: players.map(player => new ObjectId(player)) } },
                { new: true }
            );
            if (!updatedTeam) {
                throw ApiError.BadRequest("Команду не знайдено");
            }
            return updatedTeam;
        } catch (e) {
            throw ApiError.BadRequest("Помилка при оновленні команди: " + e.message);
        }
    }

    async getGameIdByTeamId(teamId) {
        if (!teamId) {
            throw ApiError.BadRequest("ID команди не передано");
        }
        try {
            const team = await Team.findById(teamId).select("game");
            if (!team || !team.game) {
                throw ApiError.BadRequest("Гра для цієї команди не знайдена");
            }
            return { gameId: team.game };
        } catch (e) {
            throw ApiError.BadRequest("Помилка при отриманні ID гри: " + e.message);
        }
    }

    async remove(id) {
        if (!id) {
            throw ApiError.BadRequest("ID команди не передано");
        }
        try {
            const deletedTeam = await Team.findByIdAndDelete(id);
            if (!deletedTeam) {
                throw ApiError.BadRequest("Команду не знайдено");
            }
            return deletedTeam;
        } catch (e) {
            throw ApiError.BadRequest("Помилка при видаленні команди: " + e.message);
        }
    }
}

module.exports = new TeamService();
