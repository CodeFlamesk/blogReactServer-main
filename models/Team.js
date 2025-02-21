const { Schema, model, ObjectId } = require("mongoose");

const Team = new Schema({
    color: { type: String, required: true },
    players: [{ type: ObjectId, ref: "TeamRole" }],

});

module.exports = model("Team", Team);
