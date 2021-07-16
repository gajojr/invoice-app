const { client } = require('../utils/db');

async function createServices(ctx) {
    try {
        const invoiceId = ctx.params.id;
        const services = ctx.request.body;

        services.map(async service => {
            await client.query(
                `
                    INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
                    VALUES ('${invoiceId}', '${service.service_type}', '${service.unit}', '${service.amount}', '${service.price_per_unit}');
                `
            );
        });

        ctx.body = 200;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createServices
}