require('dotenv').config();
const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body-parser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const { Client } = require('pg');

const app = new Koa();
const router = new KoaRouter();

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

router.post('/register', async(ctx) => {
    const body = await ctx.request.body;
    console.log(body);

    await client.connect();

    await client.query(
        `
        INSERT INTO Users(name, lastname, password, username, address, city, postal_code, company, pib, giro_account, date_of_making, email, role, document_location)
        VALUES ('${body.firstName}', '${body.lastName}', '${body.password}', '${body.username}', '${body.address}', '${body.city}', '${body.postalCode}', '${body.companyName}', '${body.pib}', '${body.giroAccount}', CURRENT_DATE, '${body.email}', 'user', 'docs/image.jpg');
        `
    );

    await client.end();

    ctx.status = 200;
});

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});