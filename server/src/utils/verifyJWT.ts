import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config({ path: '../.env' });
import jwt from 'jsonwebtoken';

export const verifyJWT = (
    req: Request & { userId: string; },
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        res.contentType('text/plain');
        res.send('You are not authenticated, you need a token!');
    } else {
        jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
            if (err) {
                res.json({ auth: false, message: 'Auth failed' });
            } else {
                next();
            }
        });
    }
}