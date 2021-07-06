require('dotenv').config();
const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body-parser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const { Client } = require('pg');
const multer = require('@koa/multer');
const bcrypt = require('bcrypt');
const send = require('koa-send');
const { removeFile } = require('./utils/utils');

const app = new Koa();
const router = new KoaRouter();
const upload = multer({ dest: './server/uploads' });

const PORT = process.env.PORT || 5000;

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client.connect(err => {
    if (err) {
        console.log(err)
    }
});

app.use(bodyParser());
app.use(cors());
app.use(helmet());
app.use(router.routes()).use(router.allowedMethods());

router.post('/register', upload.single('avatar'), async(ctx) => {
    try {
        const body = await ctx.request.body;
        // file path is not in body
        const filePath = ctx.request.file.path;
        // hash the password for security
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const usernameQuery = await client.query(
            `
                SELECT * FROM Users 
                WHERE username = '${body.username}';
            `
        );

        if (usernameQuery?.rows?.length) {
            console.log('usao u username check');
            removeFile(filePath);
            return ctx.body = { error: 'user with this username already exists!' };
            // return ctx.body = 'user with this username already exists!';
            // return ctx.status = 204;
        }

        const emailQuery = await client.query(
            `
                SELECT * FROM Users 
                WHERE email = '${body.email}';
            `
        );

        if (emailQuery?.rows?.length) {
            console.log('usao u email check');
            removeFile(filePath);
            return ctx.body = { error: 'user with this email already exists!' };
            // return ctx.body = 'user with this email address already exists!';
            // return ctx.status = 204;
        }

        await client.query(
            `
        INSERT INTO Users(name, lastname, password, username, address, city, postal_code, company, pib, giro_account, date_of_making, email, role, document_location)
        VALUES ('${body.firstName}', '${body.lastName}', '${hashedPassword}', '${body.username}', '${body.address}', '${body.city}', '${body.postalCode}', '${body.companyName}', '${body.pib}', '${body.giroAccount}', CURRENT_DATE, '${body.email}', 'user', '${filePath}');
        `
        );

        // await client.end();

        ctx.body = {...body, error: null };
    } catch (err) {
        console.log(err);
    }
});

router.get('/get-avatar', async(ctx) => {
    try {
        const username = ctx.query.username;

        const res = await client.query(
            `
                SELECT * 
                FROM Users
                WHERE username = '${username}' 
            `
        );

        const avatarURL = res.rows[0].document_location;

        await send(ctx, avatarURL);
    } catch (err) {
        console.log(err);
    }
});

router.post('/log-in', async(ctx) => {
    try {
        const { username, password } = await ctx.request.body;

        const usernameQuery = await client.query(
            `
                SELECT username FROM Users 
                WHERE username = '${username}';
            `
        );

        if (!usernameQuery.rows.length) {
            console.log('usao u username check');
            return ctx.body = { error: 'user with this username doesn\'t exist' };
        }

        const passwordQuery = await client.query(
            `
                SELECT password FROM Users
                WHERE username = '${username}';
            `
        )

        const passwordFromDb = passwordQuery.rows[0].password;

        const comparePassword = await bcrypt.compare(password, passwordFromDb);

        if (comparePassword) {
            ctx.body = { username };
        } else {
            ctx.body = { error: 'username and password don\'t match!' }
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/invoices', async(ctx) => {
    try {
        const username = ctx.query.username;

        console.log(username)

        const invoices = await client.query(
            `
            SELECT * FROM invoices
            JOIN users
            ON users.id = invoices.user_id
            WHERE users.username = '${username}'; 
        `
        );

        console.log(invoices.rows);

        ctx.body = invoices.rows;
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});