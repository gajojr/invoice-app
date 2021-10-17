import { Request, Response } from 'express';
import { get, post, controller, bodyValidator, queryValidator, paramValidator, del, patch } from '../decorators';
import pool from '../../utils/db';
import { InvoiceEnum } from './InvoiceEnum';
import ServiceInterface from './ServiceInterface';

@controller('/invoices')
class InvoicesController {
    @get('/')
    @queryValidator('username')
    async getInvoices(req: Request, res: Response) {
        try {
            const username = req.query.username;

            const invoices = await pool.query(
                `
                    SELECT 
                        invoices.id AS id, 
                        invoices.client_address AS address, 
                        invoices.client_city AS city, 
                        invoices.client_pib AS pib, 
                        invoices.name AS name FROM invoices
                    JOIN users 
                        ON users.id = invoices.user_id
                    WHERE username = '${username}'; 
                `
            );

            res.send(invoices.rows);
        } catch (err) {
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    @get('/:id')
    @queryValidator('username')
    @paramValidator('id')
    async getInvoiceById(req: Request, res: Response) {
        try {
            const username = req.query.username;
            const id = req.params.id;

            const invoice = await pool.query(
                `
                    SELECT 
                        users.name AS from_name, 
                        users.lastname AS from_lastname, 
                        users.username AS from_username, 
                        users.address AS from_address, 
                        users.city AS from_city, 
                        users.postal_code AS from_postal_code, 
                        users.company as from_company, 
                        users.pib AS from_pib, 
                        users.giro_account AS from_giro_account, 
                        users.date_of_making AS date_of_making, 
                        users.email AS from_email, 
                        invoices.name AS invoice_name, 
                        invoices.company_name AS to_company, 
                        invoices.client_address AS to_address, 
                        invoices.client_city AS to_city, 
                        invoices.client_pib AS to_pib, 
                        invoices.closing_date AS closing_date, 
                        invoices.stamp_needed AS stamp_needed, 
                        invoices.sign_needed AS sign_needed, 
                        invoices.pdv AS pdv 
                    FROM users
                    JOIN invoices on users.id = invoices.user_id
                    WHERE users.username = '${username}' AND invoices.id = '${id}';
                `
            );

            const services = await pool.query(
                `
                    SELECT 
                        id, 
                        service_type, 
                        unit, 
                        amount, 
                        price_per_unit, 
                        amount * price_per_unit AS price
                    FROM services
                    WHERE invoice_id = '${id}';
                `
            );

            res.json({ exchangeData: invoice.rows[0], services: services.rows });
        } catch (err) {
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    @del('/:id')
    @paramValidator('id')
    async deleteInvoiceById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await pool.query(
                `
                    DELETE FROM invoices
                    WHERE id = '${id}' 
                `
            );

            res.status(200);
        } catch (err) {
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    @post('/')
    @bodyValidator(
        InvoiceEnum.invoiceName,
        InvoiceEnum.companyName,
        InvoiceEnum.address,
        InvoiceEnum.city,
        InvoiceEnum.pib,
        InvoiceEnum.closingDate,
        InvoiceEnum.stamp,
        InvoiceEnum.sign,
        InvoiceEnum.pdv
    )
    @queryValidator('username')
    async createInvoice(req: Request, res: Response) {
        try {
            const body = req.body;
            const username = req.query.username;

            const userId = await pool.query(
                `
                    SELECT id FROM users WHERE username = '${username}';
                `
            );

            const invoiceId = await pool.query(
                `
                    INSERT INTO invoices(user_id, name, company_name, client_address, client_city, client_pib, closing_date, stamp_needed, sign_needed, pdv)
                    VALUES(${userId.rows[0].id}, '${body.invoiceName}', '${body.companyName}', '${body.address}', '${body.city}', '${body.pib}', '${body.closingDate}', '${body.stamp}', '${body.sign}', '${body.pdv}');   
                    
                    SELECT CURRVAL(pg_get_serial_sequence('invoices','id'))
                `
            );

            res.send((invoiceId as any)[1].rows[0].currval);
        } catch (err) {
            res.status(500).json('Server error occurred');
        }
    }

    @post('/create-services/:id')
    @paramValidator('id')
    async createServices(req: Request, res: Response) {
        try {
            const invoiceId = req.params.id;
            const services = req.body;

            await pool.query(
                `
                    INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
                    VALUES
                    ${services.map((service: ServiceInterface) => {
                    return `('${invoiceId}', '${service.service_type}', '${service.unit}', '${service.amount}', '${service.price_per_unit}'),`
                })}
                `
            );

            // services.map(async (service: ServiceInterface) => {
            //     await pool.query(
            //         `
            //             INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
            //             VALUES ('${invoiceId}', '${service.service_type}', '${service.unit}', '${service.amount}', '${service.price_per_unit}');
            //         `
            //     );
            // });

            res.status(200);
        } catch (err) {
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    @patch('/invoice/:id')
    @bodyValidator(
        InvoiceEnum.invoiceName,
        InvoiceEnum.companyName,
        InvoiceEnum.address,
        InvoiceEnum.city,
        InvoiceEnum.pib,
        InvoiceEnum.closingDate,
        InvoiceEnum.stamp,
        InvoiceEnum.sign,
        InvoiceEnum.pdv
    )
    @paramValidator('id')
    async updateInvoiceById(req: Request, res: Response) {
        try {
            const invoiceId = req.params.id;
            const body = req.body;
            const services = body.services;

            // delete all services connected with this invoice and then insert them
            await pool.query(
                `
                    DELETE FROM services 
                    WHERE invoice_id = '${invoiceId}';
                `
            );

            await pool.query(
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

            services.map(async (service: ServiceInterface) => {
                await pool.query(
                    `
                        INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)
                        VALUES ('${invoiceId}', '${service.service_type}', '${service.unit}', '${service.amount}', '${service.price_per_unit}');
                    `
                );
            });

            res.status(200);
        } catch (err) {
            res.json({ error: 'Server error occurred' });
        }
    }
}