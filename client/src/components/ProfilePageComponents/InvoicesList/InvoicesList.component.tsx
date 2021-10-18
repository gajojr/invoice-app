import { useState, useEffect } from 'react';
import axios from 'axios';

import { InvoiceInterface } from '../InvoiceInterface';
import { CardsContainer, CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';

const InvoicesList = () => {
    const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/invoices', {
                params: {
                    username: sessionStorage.getItem('username')
                },
                headers: {
                    'x-access-token': sessionStorage.getItem('token')
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
        <CardsContainer>
            <span>Your invoices:</span>
            <CardContainer>
                {invoices.map((invoice: InvoiceInterface) => <InvoiceCard key={invoice.id} invoice={invoice} />)}
            </CardContainer>
        </CardsContainer>
    )
}

export default InvoicesList;
