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
        res.status(401).send('You are not authenticated');
    } else {
        jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
            if (err) {
                res.status(401).send('Auth failed');
            } else {
                next();
            }
        });
    }
}