/* const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    gameRole: { type: String, required: true },
});

module.exports = mongoose.model("TeamRole", TeamRole);
 */
const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    gameRole: [{ role: String, user: mongoose.Schema.Types.ObjectId }]

});

module.exports = mongoose.model("TeamRole", TeamRole);

/* const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    teamId: { type: String, required: true },
    role: { type: String, required: true },
    user: { type: String, required: true }
});

module.exports = mongoose.model("TeamRole", TeamRole);
 */