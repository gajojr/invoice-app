const { client } = require('../utils/db');

async function updateInvoice(ctx) {
    try {
        const invoiceId = ctx.params.id;
        const body = ctx.request.body;
        const services = body.services;

        // delete all services connected with this invoice and then insert them
        await client.query(
            `
                DELETE FROM services 
                WHERE invoice_id = '${invoiceId}';
            `
        );

        await client.query(
            `
                UPDATE invoices 
                SET name = '${body.invoiceName}',
                    company_name = '${body.companyName}',
                    client_address = '${body.address}',
                    client_city = '${body.city}',
                    client_pib = '${body.pib}',
                    closing_date = '${body.closingDate}',
                    stamp_needed = '${body.stamp}',
                    sign_needed = '${body.sign}',
                    pdv = '${body.pdv}'
                WHERE id = '${invoiceId}';
            `
        );

        services.map(async service => {
            await client.query(
                `
                    INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
                    VALUES ('${invoiceId}', '${service.service_type}', '${service.unit}', '${service.amount}', '${service.price_per_unit}');
                `
            );
        });

        ctx.status = 200;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateInvoice
}