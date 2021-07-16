const bcrypt = require('bcrypt')

const { client } = require('../utils/db');

async function userLogIn(ctx) {
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

        const passwordAndRoleQuery = await client.query(
            `
                SELECT password, role FROM Users
                WHERE username = '${username}';
            `
        )

        const passwordFromDb = passwordAndRoleQuery.rows[0].password;

        const comparePassword = await bcrypt.compare(password, passwordFromDb);

        if (comparePassword) {
            ctx.body = { username, role: passwordAndRoleQuery.rows[0].role };
        } else {
            ctx.body = { error: 'username and password don\'t match!' }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    userLogIn
}