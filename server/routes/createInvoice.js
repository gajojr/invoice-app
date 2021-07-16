const { client } = require('../utils/db');

async function createInvoice(ctx) {
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
}

module.exports = {
    createInvoice
}