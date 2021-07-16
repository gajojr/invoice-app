const { client } = require('../utils/db');

async function getInvoiceToUpdate(ctx) {
    try {
        const invoiceId = ctx.params.id;

        const invoice = await client.query(
            `
                SELECT * FROM invoices 
                WHERE id = '${invoiceId}'
            `
        );

        const services = await client.query(
            `
                SELECT * FROM services 
                WHERE invoice_id = '${invoiceId}'
            `
        );

        ctx.body = {
            invoice: invoice.rows[0],
            services: services.rows
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getInvoiceToUpdate
}