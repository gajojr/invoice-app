import { Request, Response } from 'express';
import { get, post, controller, bodyValidator, use } from '../decorators';
import pool from '../../utils/db';

@controller('')
class AvatarController {
    @get('/avatar')
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