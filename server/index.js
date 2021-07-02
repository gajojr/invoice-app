require('dotenv').config();
const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body-parser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const { Client } = require('pg');
const multer = require('@koa/multer');
const bcrypt = require('bcrypt');

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
        console.log(body);
        console.log(ctx.request.file.path);
        console.log(hashedPassword);

        await client.connect(err => {
            if (err) {
                console.log(err);
                return;
            }
        });

        const usernameCheck = await client.query(
            `
                SELECT * FROM Users 
                WHERE username = '${body.username}';
            `
        );

        if (usernameCheck?.rows?.length) {
            console.log('usao u username check');
            return ctx.body = 'user with this username already exists!';
            // return ctx.status = 204;
        }

        const emailCheck = await client.query(
            `
                SELECT * FROM Users 
                WHERE email = '${body.email}';
            `
        );

        if (emailCheck?.rows?.length) {
            console.log('usao u email check');
            return ctx.body = 'user with this email address already exists!';
            // return ctx.status = 204;
        }

        await client.query(
            `
        INSERT INTO Users(name, lastname, password, username, address, city, postal_code, company, pib, giro_account, date_of_making, email, role, document_location)
        VALUES ('${body.firstName}', '${body.lastName}', '${hashedPassword}', '${body.username}', '${body.address}', '${body.city}', '${body.postalCode}', '${body.companyName}', '${body.pib}', '${body.giroAccount}', CURRENT_DATE, '${body.email}', 'user', '${filePath}');
        `
        );

        // await client.end();

        ctx.body = 'success';
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});