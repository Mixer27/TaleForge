import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    email: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

export { User };
