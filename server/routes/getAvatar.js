const send = require('koa-send');

const { client } = require('../utils/db');

async function getAvatar(ctx) {
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
}

module.exports = {
    getAvatar
}