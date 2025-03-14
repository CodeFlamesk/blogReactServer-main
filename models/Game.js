const { Schema, model, ObjectId } = require("mongoose");

const gameSchema = new Schema({
    type: { type: String, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    map: { type: String, required: true },
    about: { type: String, },
    gameImages: [{ type: String }],
    teams: [{ type: ObjectId, ref: "Team" }],
    votes: { type: ObjectId, ref: "Votes", default: null }
}, { timestamps: true });

module.exports = model("Game", gameSchema);
