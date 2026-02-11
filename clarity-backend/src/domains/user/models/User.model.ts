/**
 * @file User.model.ts
 * @description This file contains the schema for the User model.
 * It defines the structure of the User document in the MongoDB database.
 */

import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "interface/user/IUser";

interface IUserDoc extends Document, IUser { };

//Schema for User
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        default: null,
    }
},
    { timestamps: true }
)

interface IUserModel extends Model<IUserDoc> { };

const User: IUserModel = mongoose.model<IUserDoc, IUserModel>('User', UserSchema);
export default User;
