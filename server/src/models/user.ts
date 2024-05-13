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
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

export { User };
