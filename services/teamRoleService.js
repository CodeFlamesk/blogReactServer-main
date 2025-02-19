const TeamRole = require("../models/TeamRole");
const ApiError = require("../exceptions/apiError")
class teamRoleService {
    async add(gameRole) {
        try {
            const newGameRole = TeamRole({ gameRole });
            return await newGameRole.save();
        } catch (e) {
            throw ApiError.BadRequest("Роль не створено");
        }
    }
    async getAll() {
        try {
            return await TeamRole.find()
        } catch (e) {
            throw ApiError.BadRequest("Не вдалось получити всі ігрові ролі" + e.message);
        }
    }
    async getById(id) {
        try {
            return await TeamRole.findById(id);
        } catch (e) {
            throw new Error("Помилка при отриманні ролі за ID: " + e.message);
        }
    }
}


module.exports = new teamRoleService