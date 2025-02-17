const TeamRole = require("../models/TeamRole");

class TeamRoleService {
    async createRole(gamerole) {
        const newRole = new TeamRole({ gamerole });
        await newRole.save();
        return newRole;
    }

    async getAllRoles() {
        return TeamRole.find();
    }
}

module.exports = new TeamRoleService();
