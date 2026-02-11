/**
 * @file IUser.ts
 * @description This file contains the interface for the User model.
 */

export interface IUser{
    username: string;
    email: string;
    password: string,
    refresh_token: string;
    createdAt?: Date;
    updatedAt?: Date;
}