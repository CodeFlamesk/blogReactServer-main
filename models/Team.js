const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }
        }
    ]
});

module.exports = mongoose.model("Team", teamSchema);
