import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InvoiceState, loadInvoices } from '../../../redux/reducers/invoiceReducer';

import { InvoiceInterface } from '../InvoiceInterface';
import { CardsContainer, CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';

const InvoicesList = () => {
    const invoices = useSelector<InvoiceState, InvoiceState['invoices']>((state) => state.invoices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadInvoices());
    }, [dispatch]);

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
