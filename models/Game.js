const { Schema, model, ObjectId } = require("mongoose")
const gameSchema = new Schema({
    type: { type: String, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    map: { type: String, required: true },
    about: { type: String, required: true },
    images: [{ type: String }],
    roles: [
        {
            role: { type: String, required: true },
            user: { type: String, required: true },
        },
    ],
    team: [
        {
            team: { type: String, required: true },
            user: { type: String, required: true },
        },
    ],
}, { timestamps: true });
module.exports = model("Game", gameSchema);