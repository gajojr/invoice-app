import { useState, useEffect } from 'react';
import axios from 'axios';

import { InvoiceInterface } from '../InvoiceInterface';
import { CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';

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
            <CardContainer>
                {invoices.map((invoice: InvoiceInterface) => <InvoiceCard key={invoice.id} invoice={invoice} />)}
            </CardContainer>
        </div>
    )
}

export default InvoicesList;
