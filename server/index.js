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

        const invoices = await client.query(
            `
                SELECT invoices.id AS id, invoices.client_address AS address, invoices.client_city AS city, invoices.client_pib AS pib, invoices.name AS name FROM invoices
                JOIN users 
                    ON users.id = invoices.user_id
                WHERE username = '${username}'; 
            `
        );

        ctx.body = invoices.rows;
    } catch (err) {
        console.log(err);
    }
});

router.get('/invoices/:id', async(ctx) => {
    try {
        const username = ctx.query.username;
        const id = ctx.params.id;

        const invoice = await client.query(
            `
                SELECT users.name AS from_name, users.lastname AS from_lastname, users.username AS from_username, users.address AS from_address, users.city AS from_city, users.postal_code AS from_postal_code, users.company as from_company, users.pib AS from_pib, users.giro_account AS from_giro_account, users.date_of_making AS date_of_making, users.email AS from_email, invoices.name AS invoice_name, invoices.company_name AS to_company, invoices.client_address AS to_address, invoices.client_city AS to_city, invoices.client_pib AS to_pib, invoices.closing_date AS closing_date, invoices.stamp_needed AS stamp_needed, invoices.sign_needed AS sign_needed, invoices.pdv AS pdv from users
                JOIN invoices on users.id = invoices.user_id
                WHERE users.username = '${username}' AND invoices.id = '${id}';
            `
        );

        const services = await client.query(
            `
                SELECT id, service_type, unit, amount, price_per_unit, amount * price_per_unit AS price
                FROM services
                WHERE invoice_id = '${id}';
            `
        );

        ctx.body = { exchangeData: invoice.rows[0], services: services.rows };
    } catch (err) {
        console.log(err);
    }
});

router.delete('/invoices/:id', async(ctx) => {
    try {
        const id = ctx.params.id;

        await client.query(
            `
                DELETE FROM services
                WHERE invoice_id = '${id}' 
            `
        );

        await client.query(
            `
                DELETE FROM invoices
                WHERE id = '${id}' 
            `
        );

        ctx.status = 200;
    } catch (err) {
        console.log(err);
    }
});

router.post('/create-invoice', async(ctx) => {
    try {
        const body = ctx.request.body;
        const username = ctx.query.username;

        const userId = await client.query(
            `
                SELECT id FROM users WHERE username = '${username}';
            `
        );

        const invoiceId = await client.query(
            `
                INSERT INTO invoices(user_id, name, company_name, client_address, client_city, client_pib, closing_date, stamp_needed, sign_needed, pdv)
                VALUES(${userId.rows[0].id}, '${body.invoiceName}', '${body.companyName}', '${body.address}', '${body.city}', '${body.pib}', '${body.closingDate}', '${body.stamp}', '${body.sign}', '${body.pdv}');   
                
                SELECT CURRVAL(pg_get_serial_sequence('invoices','id'))
            `
        );

        ctx.body = invoiceId[1].rows[0].currval;
    } catch (err) {
        console.log(err);
    }
});

router.post('/create-services/:id', async(ctx) => {
    try {
        const invoiceId = ctx.params.id;
        const services = ctx.request.body;

        services.map(async service => {
            await client.query(
                `
                    INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
                    VALUES ('${invoiceId}', '${service.type}', '${service.unit}', '${service.amount}', '${service.pricePerUnit}');
                `
            );
        });

        ctx.body = 200;
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});