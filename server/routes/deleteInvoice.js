const { client } = require('../utils/db');

async function deleteInvoice(ctx) {
    try {
        const id = ctx.params.id;

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
}

module.exports = {
    deleteInvoice
}