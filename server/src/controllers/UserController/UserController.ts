import { Request, RequestHandler, Response } from 'express';
import { controller, bodyValidator, del, post, use } from '../decorators';
import { sendLeavingEmail } from '../../utils/emailAccount';
import pool from '../../utils/db';
import { verifyJWT } from '../../utils/verifyJWT';
import { UserEnum } from './UserEnum';
import { imageUrlCleanUp } from '../../utils/imageUrlCleanUp';
import { removeFileFromS3 } from '../../utils/s3';

@controller('/users')
class UserController {
    @del('/')
    @use(verifyJWT as RequestHandler)
    async deleteUser(req: Request, res: Response) {
        try {
            const username = req.query.username;
            const adminUsername = req.query.adminUsername;

            const admin = await pool.query(
                `
                    SELECT role FROM users
                    WHERE username = '${adminUsername}'
                `
            );

            if (admin.rows[0]?.role !== 'admin') {
                res.json({ redirect: true });
            }

            const user = await pool.query(
                `
                    SELECT username, role, email, document_location FROM users
                    WHERE username = '${username}';
                `
            );

            if (!user.rows[0]) {
                res.json({ error: 'there is no user with this username' });
            }

            if (user.rows[0]?.role === 'admin') {
                console.log('usao u drugi admin');
                console.log(user.rows[0].role);
                res.json({ error: 'You can\'t delete other admins' });
            }

            await pool.query(
                `
                    DELETE FROM users
                    WHERE username = '${username}'
                `
            );

            // delete file from s3 bucket
            removeFileFromS3(imageUrlCleanUp(user.rows[0].document_location));

            sendLeavingEmail(user.rows[0].email, username as string);

            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    @post('/update-user')
    @bodyValidator(UserEnum.username, UserEnum.adminUsername)
    @use(verifyJWT as RequestHandler)
    async promoteUserToAdmin(req: Request, res: Response) {
        const username = req.body.username;
        const adminUsername = req.body.adminUsername;

        const admin = await pool.query(
            `
                SELECT role FROM users
                WHERE username = '${adminUsername}'
            `
        );

        if (admin.rows[0]?.role !== 'admin') {
            res.json({ redirect: true });
        }

        const user = await pool.query(
            `
                SELECT username, role FROM users
                WHERE username = '${username}'
            `
        );

        if (!user.rows[0]) {
            res.json({ error: 'There is no user with this username' });
        }

        if (user.rows[0]?.role === 'admin') {
            res.json({ error: 'This user is already admin' });
        }

        await pool.query(
            `
                UPDATE users 
                SET role = 'admin'
                WHERE username = '${username}';
            `
        );

        res.sendStatus(200);
    }
}