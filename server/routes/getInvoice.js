const { client } = require('../utils/db');

async function getInvoice(ctx) {
    try {
        const username = ctx.query.username;
        const id = ctx.params.id;

        const invoice = await client.query(
            `
                SELECT users.name AS from_name, users.lastname AS from_lastname, users.username AS from_username, users.address AS from_address, users.city AS from_city, users.postal_code AS from_postal_code, users.company as from_company, users.pib AS from_pib, users.giro_account AS from_giro_account, users.date_of_making AS date_of_making, users.email AS from_email, invoices.name AS invoice_name, invoices.company_name AS to_company, invoices.client_address AS to_address, invoices.client_city AS to_city, invoices.client_pib AS to_pib, invoices.closing_date AS closing_date, invoices.stamp_needed AS stamp_needed, invoices.sign_needed AS sign_needed, invoices.pdv AS pdv from users
                JOIN invoices on users.id = invoices.user_id
                WHERE users.username = '${username}' AND invoices.id = '${id}';
            `
        );

        const services = await client.query(
            `
                SELECT id, service_type, unit, amount, price_per_unit, amount * price_per_unit AS price
                FROM services
                WHERE invoice_id = '${id}';
            `
        );

        ctx.body = { exchangeData: invoice.rows[0], services: services.rows };
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getInvoice
}