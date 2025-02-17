const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const teamRoleService = require("../services/teamRoleService");

class TeamRoleController {
    async createRole(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(errors.array()[0].msg));
            }

            const { gamerole } = req.body;
            const newRole = await teamRoleService.createRole(gamerole);
            return res.status(201).json(newRole);
        } catch (e) {
            next(e);
        }
    }

    async getRoles(req, res, next) {
        try {
            const roles = await teamRoleService.getAllRoles();
            return res.json(roles);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TeamRoleController();
