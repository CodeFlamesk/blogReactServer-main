const { Schema, model, ObjectId } = require("mongoose")

const teamroleSchema = new Schema({
    gamerole: { type: String, required: true }
})
module.exports = model("TeamRole", teamroleSchema);