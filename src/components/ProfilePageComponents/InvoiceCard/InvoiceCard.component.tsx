import { Link } from 'react-router-dom';

import { InvoiceInterface } from '../InvoiceInterface';

import { Card } from 'antd';
import { DeleteButton } from './InvoiceCard.style';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
    const deleteInvoice = (id: number) => {
        if (window.confirm('do you want to delete this invoice')) {
            console.log(`invoice with id: ${id} deleted`);
        }
    }

    return (
        <Card size="small" title={invoice.name} extra={<div><Link to="/">View</Link><DeleteButton type="primary" onClick={() => deleteInvoice(invoice.id)}>Delete</DeleteButton></div>} style={{ width: 300 }}>
            <p>{invoice.city}</p>
            <p>{invoice.address}</p>
            <p>{invoice.pib}</p>
        </Card>
    )
}

export default InvoiceCard;
