import { Request, Response } from 'express';
import { get, post, controller, bodyValidator } from './decorators';
import pool from '../utils/db';
import bcrypt from 'bcrypt';
@controller('')
class LoginController {
    @post('/log-in')
    @bodyValidator('username', 'password')
    async postLogin(req: Request, res: Response) {
        try {
            const { username, password } = await req.body;

            const usernameQuery = await pool.query(
                `
                    SELECT username FROM Users 
                    WHERE username = '${username}';
                `
            );

            if (!usernameQuery.rows.length) {
                console.log('usao u username check');
                return res.json({ error: 'false credentials' });
            }

            const passwordAndRoleQuery = await pool.query(
                `
                    SELECT password, role FROM Users
                    WHERE username = '${username}';
                `
            )

            const passwordFromDb = passwordAndRoleQuery.rows[0].password;

            const comparePasswordSuccess = await bcrypt.compare(password, passwordFromDb);

            if (comparePasswordSuccess) {
                res.json({ username, role: passwordAndRoleQuery.rows[0].role });
            } else {
                res.json({ error: 'false credentials' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        // req.session = undefined;
        // res.redirect('/');
    }
}