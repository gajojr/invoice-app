import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { post, controller, bodyValidator, use } from '../decorators';
import pool from '../../utils/db';
import { upload } from '../../utils/fileActions';
import { removeFile } from '../../utils/fileActions';
import { AuthEnum } from './AuthEnum';
import { uploadFile } from '../../utils/s3';

@controller('')
class AuthController {
    @post('/register')
    @use(upload.single('avatar'))
    @bodyValidator(
        AuthEnum.firstName,
        AuthEnum.lastName,
        AuthEnum.password,
        AuthEnum.username,
        AuthEnum.address,
        AuthEnum.city,
        AuthEnum.postalCode,
        AuthEnum.companyName,
        AuthEnum.pib,
        AuthEnum.giroAccount,
        AuthEnum.email
    )
    async postRegister(req: Request, res: Response) {
        try {
            const { firstName, lastName, password, username, address, city, postalCode, companyName, pib, giroAccount, email } = req.body;
            // file path is not in body
            const filePath = req?.file?.path;

            const hashedPassword = await bcrypt.hash(password, 10);

            const usernameQuery = await pool.query(
                `
                    SELECT * FROM Users 
                    WHERE username = '${username}';
                `
            );

            if (usernameQuery?.rows?.length) {
                console.log('usao u username check');
                // register failed, remove the profile picture
                removeFile(filePath as string);
                res.json({ error: 'user with this username already exists!' });
            }

            const emailQuery = await pool.query(
                `
                    SELECT * FROM Users 
                    WHERE email = '${email}';
                `
            );

            if (emailQuery?.rows?.length) {
                console.log('usao u email check');
                // register failed, remove the profile picture
                removeFile(filePath as string);
                res.json({ error: 'user with this email already exists!' });
            }

            await pool.query(
                `
                    INSERT INTO Users(name, lastname, password, username, address, city, postal_code, company, pib, giro_account, date_of_making, email, role, document_location)
                    VALUES ('${firstName}', '${lastName}', '${hashedPassword}', '${username}', '${address}', '${city}', '${postalCode}', '${companyName}', '${pib}', '${giroAccount}', CURRENT_DATE, '${email}', 'user', '${filePath}');
                `
            );

            // upload to s3 bucket
            const s3uploadResult = await uploadFile(req.file as Express.Multer.File);
            console.log(s3uploadResult);

            const payload = { username };
            const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: 3600 });

            res.json({ ...req.body, token });
        } catch (err) {
            console.log(err);
            res.json({ error: 'Server error occurred' });
        }
    }

    @post('/log-in')
    @bodyValidator(AuthEnum.username, AuthEnum.password)
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
                const payload = { username };
                const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: 3600 });

                res.json({ username, role: passwordAndRoleQuery.rows[0].role, token });
            } else {
                res.json({ error: 'false credentials' });
            }
        } catch (err) {
            console.log(err);
            res.json({ error: 'Server error occurred' });
        }
    }
}