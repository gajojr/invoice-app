import { Request, RequestHandler, Response } from 'express';
import { get, controller, use } from '../decorators';
import pool from '../../utils/db';
import { verifyJWT } from '../../utils/verifyJWT';

@controller('')
class AvatarController {
    @get('/avatar')
    @use(verifyJWT as RequestHandler)
    async getAvatar(req: Request, res: Response) {
        try {
            const username = req.query.username;

            const documentQuery = await pool.query(
                `
                    SELECT document_location 
                    FROM Users
                    WHERE username = '${username}' 
                `
            );

            res.send(documentQuery.rows[0].document_location);
        } catch (err) {
            res.status(500).send('Error occurred on server');
        }
    }
}