const { client } = require('../utils/db');
const { removeFile } = require('../utils/utils');
const { sendLeavingEmail } = require('../utils/emailAccount');

async function deleteUser(ctx) {
    try {
        console.log(ctx.query.username);
        const username = ctx.query.username;
        const adminUsername = ctx.query.adminUsername;

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
                SELECT username, role, email, document_location FROM users
                WHERE username = '${username}';
            `
        );

        if (!user.rows[0]) {
            return ctx.body = { error: 'there is no user with this username' };
        }

        if (user.rows[0]?.role === 'admin') {
            return ctx.body = { error: 'You can\'t delete other admins' };
        }

        await client.query(
            `
                DELETE FROM users
                WHERE username = '${username}'
            `
        );

        removeFile(user.rows[0].document_location);

        sendLeavingEmail(user.rows[0].email, username);

        ctx.status = 200;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    deleteUser
}