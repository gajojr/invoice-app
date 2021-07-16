const bcrypt = require('bcrypt');

const { client } = require('../utils/db');
const { removeFile } = require('../utils/utils');

async function registerUser(ctx) {
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
}

module.exports = {
    registerUser
}