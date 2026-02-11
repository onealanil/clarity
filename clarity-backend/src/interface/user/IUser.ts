/**
 * @file IUser.ts
 * @description This file contains the interface for the User model.
 */

export interface IUser{
    username: string;
    email: string;
    password: string,
    refresh_token: string;
    monthly_income?: number;
    goal?: string;
    createdAt?: Date;
    updatedAt?: Date;
}