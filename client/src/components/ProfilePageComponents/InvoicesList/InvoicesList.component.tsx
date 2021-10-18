import { useState, useEffect } from 'react';
import axios from 'axios';

import { InvoiceInterface } from '../InvoiceInterface';
import { CardsContainer, CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';
import { message } from 'antd';

const InvoicesList = () => {
    const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);

    useEffect(() => {
        (async () => {
            try {
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
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    message.error('Auth failed');
                } else {
                    message.error('Server error occurred');
                }

                sessionStorage.clear();
                window.location.href = '/';
            }
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
