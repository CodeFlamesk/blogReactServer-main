/* const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    gameRole: { type: String, required: true },
});

module.exports = mongoose.model("TeamRole", TeamRole);
 */
const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    gameRole: { type: [String], required: true },
});

module.exports = mongoose.model("TeamRole", TeamRole);
