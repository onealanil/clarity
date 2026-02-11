import jwt from "jsonwebtoken";

//generate access token
export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: (process.env.ACCESS_TOKEN_EXPIRES || '15m') as jwt.SignOptions['expiresIn'],
        }
    );
};

//generate refresh token
export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRES || '7d') as jwt.SignOptions['expiresIn'],
    });
};
