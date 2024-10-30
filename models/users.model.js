import mongoose from "mongoose";
import validator from 'validator';
import { userRoles } from "../utils/user.rolers.js"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "this not an Email"]

    },
    password: {
        type: String,
        required: true,

    },
    token: {
        type:String
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
        default: userRoles.USER,
    },
    avater: {
        type: String,
        default:"upload/profile.png"
    },
    fing: {
        type: String,
        default:"fing"
    },
    isAdmin: Boolean,
    tim:String,


})

export const Users = mongoose.model("User", userSchema);
