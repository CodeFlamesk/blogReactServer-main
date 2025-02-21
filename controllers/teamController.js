const TeamService = require("../services/teamService");

class TeamController {
    async create(req, res, next) {
        try {
            const { color, players } = req.body;
            const team = await TeamService.add({ color, players });
            return res.status(201).json(team);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const teams = await TeamService.getAll();
            return res.json(teams);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const team = await TeamService.getById(id);
            return res.json(team);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedTeam = await TeamService.update(id, data);
            return res.json(updatedTeam);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedTeam = await TeamService.remove(id);
            return res.json({ message: "Команду видалено", deletedTeam });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TeamController();
