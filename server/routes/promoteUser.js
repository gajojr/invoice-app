const { client } = require('../utils/db');

async function promoteUserToAdmin(ctx) {
    const username = ctx.request.body.username;
    const adminUsername = ctx.request.body.adminUsername;

    const admin = await client.query(
        `
            SELECT role FROM users
            WHERE username = '${adminUsername}'
        `
    );

    if (admin.rows[0]?.role !== 'admin') {
        return ctx.body = { redirect: true };
    }

    const user = await client.query(
        `
            SELECT username, role FROM users
            WHERE username = '${username}'
        `
    );

    if (!user.rows[0]) {
        return ctx.body = { error: 'There is no user with this username' }
    }

    if (user.rows[0]?.role === 'admin') {
        return ctx.body = { error: 'This user is already admin' }
    }

    await client.query(
        `
            UPDATE users 
            SET role = 'admin'
            WHERE username = '${username}';
        `
    );

    ctx.body = 200;
}

module.exports = {
    promoteUserToAdmin
}