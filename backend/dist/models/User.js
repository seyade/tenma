import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export const UserModel = mongoose.model("User", UserSchema);
