const mongoose = require("mongoose");

const TeamRole = new mongoose.Schema({
    gameRole: [{ role: String, user: mongoose.Schema.Types.ObjectId }]
});

module.exports = mongoose.model("TeamRole", TeamRole);
