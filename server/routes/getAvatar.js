const { client } = require('../utils/db');

async function getAvatar(ctx) {
    try {
        const username = ctx.query.username;

        const res = await client.query(
            `
                SELECT document_location 
                FROM Users
                WHERE username = '${username}' 
            `
        );

        ctx.body = res.rows[0].document_location;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAvatar
}