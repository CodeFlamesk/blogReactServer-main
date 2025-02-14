const { Schema, model, ObjectId } = require("mongoose")

const gameSchema = new Schema({
    type: { type: String, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    map: { type: String, required: true },
    about: { type: String, required: true },
    gameImages: [{ type: String }],
    roles: [
        {
            role: { type: String, },
            user: { type: String, },
        },
    ],
    team: [
        {
            team: { type: String, },
            user: { type: String, },
        },
    ],
}, { timestamps: true });
module.exports = model("Game", gameSchema);