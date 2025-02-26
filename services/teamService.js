const Team = require("../models/Team");
const ApiError = require("../exceptions/apiError");

class TeamService {
    async add({ color, players, game }) {
        if (!color) {
            throw ApiError.BadRequest("Колір є обов'язковим ");
        }
        try {
            const newTeam = new Team({ color, players, game });
            return await newTeam.save();
        } catch (e) {
            throw ApiError.BadRequest("Команду не створено: " + e.message);
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

    async getAll() {
        try {
            return await Team.find().populate("players game");
        } catch (e) {
            throw ApiError.BadRequest("Не вдалося отримати всі команди: " + e.message);
        }
    }

    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest("ID не передано");
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



    async remove(id) {
        if (!id) {
            throw ApiError.BadRequest("ID не передано");
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
