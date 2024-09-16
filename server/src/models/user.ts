import mongoose, { Model } from "mongoose";
import { Schema } from "mongoose";
import { hash, genSalt, compare } from "bcrypt";
import { NextFunction } from "express";

interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    username: string,
    password: string,
}

interface IUserModel extends Model<IUser> {
    findAndValidate(username: string, password: string): Promise<IUser | false>;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
    },
});

UserSchema.statics.findAndValidate = async function (username: string, password: string) {
    const foundUser = await this.findOne({ username });
    // console.log(username === 'mix' ? "YES" : "NO");
    console.log("findAndValidate", foundUser, username, password);
    const isValid = await compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err: any) {
        next(err);
    }
})

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export { User, UserSchema };
