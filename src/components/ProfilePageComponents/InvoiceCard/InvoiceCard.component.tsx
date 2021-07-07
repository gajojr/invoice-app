import { Link } from 'react-router-dom';

import { InvoiceInterface } from '../InvoiceInterface';

import { Card } from 'antd';
import { DeleteButton, UpdateButton } from './InvoiceCard.style';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
    const deleteInvoice = (id: number) => {
        if (window.confirm('do you want to delete this invoice')) {
            console.log(`invoice with id: ${id} deleted`);
        }
    }

    const updateInvoice = (id: number) => {
        console.log(`invoice with id: ${id} updated`);
    }

    return (
        <Card
            size="small"
            title={invoice.name}
            extra={
                <div>
                    <Link to={`/invoices/${invoice.id}`}>View</Link>
                    <UpdateButton onClick={() => updateInvoice(invoice.id)}>Update</UpdateButton>
                    <DeleteButton type="primary" onClick={() => deleteInvoice(invoice.id)}>Delete</DeleteButton>
                </div>
            }
            style={{ width: 300 }}
        >
            <p>City: {invoice.city}</p>
            <p>Address: {invoice.address}</p>
            <p>PIB: {invoice.pib}</p>
            <Link to='/'><p style={{ color: '#000' }}>...</p></Link>
        </Card>
    )
}

export default InvoiceCard;
