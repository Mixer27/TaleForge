import mongoose from "mongoose";
import { Schema } from "mongoose";

const SkillSchema = new Schema({
    name: String,
    description: String,
})

const Skill = mongoose.model("Skill", SkillSchema);

export { Skill }