const TeamRoleService = require("../services/teamRoleService");

class TeamRoleController {
    async add(req, res) {
        try {
            const { gameRole } = req.body;
            const role = await TeamRoleService.add(gameRole);
            res.status(201).json(role);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const roles = await TeamRoleService.getAll();
            res.json(roles);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const role = await TeamRoleService.getById(id);
            if (!role) {
                return res.status(404).json({ message: "Роль не знайдено" });
            }
            res.json(role);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new TeamRoleController();
