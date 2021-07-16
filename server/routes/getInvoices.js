const { client } = require('../utils/db');

async function getInvoices(ctx) {
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
}

module.exports = {
    getInvoices
}