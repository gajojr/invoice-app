const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'InvoiceApp'
});

client.connect();

client.query('SELECT * FROM Users', (err, result) => {
    if (!err) {
        console.log(result.row);
    }

    client.end();
});