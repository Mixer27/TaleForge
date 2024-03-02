import mongoose from "mongoose";
import { Schema } from "mongoose";

const TalentSchema = new Schema({
    name: String,
    description: String,
})

const Talent = mongoose.model("Talent", TalentSchema);

export { Talent };