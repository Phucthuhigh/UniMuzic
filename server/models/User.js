import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    avatar: {
        type: Schema.ObjectId,
        default: new ObjectId("653bc4ce935189137f39a8f7"),
    },
    favorite: [String],
    history: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("users", UserSchema);
