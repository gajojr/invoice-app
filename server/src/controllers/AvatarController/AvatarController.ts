import { Request, RequestHandler, Response } from 'express';
import { get, controller, use } from '../decorators';
import pool from '../../utils/db';
import { verifyJWT } from '../../utils/verifyJWT';
import { imageUrlCleanUp } from '../../utils/imageUrlCleanUp';
import { getFileStream } from '../../utils/s3';

@controller('')
class AvatarController {
    @get('/avatar')
    @use(verifyJWT as RequestHandler)
    async getAvatarUrl(req: Request, res: Response) {
        try {
            const username = req.query.username;

            const documentQuery = await pool.query(
                `
                    SELECT document_location 
                    FROM Users
                    WHERE username = '${username}' 
                `
            );

            let docUrl = imageUrlCleanUp(documentQuery.rows[0].document_location);
            // from uploads\key to avatar/key
            docUrl = `avatar/${docUrl}`;

            res.send(docUrl);
        } catch (err) {
            res.status(500).send('Error occurred on server');
        }
    }

    @get('/avatar/:key')
    getAvatarByKey(req: Request, res: Response) {
        try {
            const key = req.params.key;

            const readStream = getFileStream(key);

            readStream.pipe(res);
        } catch (err) {
            res.status(500).send('Error occurred on server');
        }
    }
}