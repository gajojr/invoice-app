import { useState, useEffect } from 'react';
import axios from 'axios';

const InvoicesList = () => {
    const [invoices, setInvoices] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:5000/invoices', {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
            setInvoices(response.data);
        })();
    }, []);

    if (!invoices.length) {
        return <span>You don't have any invoices yet</span>
    }

    return (
        <div>
            <span>Your invoices:</span>
            {invoices.map((invoice: any, idx: number) => {
                return <div key={idx}>{invoice.client_address}</div>
            })}
        </div>
    )
}

export default InvoicesList;
