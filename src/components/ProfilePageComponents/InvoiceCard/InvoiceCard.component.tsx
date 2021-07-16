import axios from 'axios';

import { Link } from 'react-router-dom';

import { InvoiceInterface } from '../InvoiceInterface';

import { Card, message } from 'antd';
import { StyledCard, DeleteButton, UpdateButton } from './InvoiceCard.style';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
    const deleteInvoice = async (id: number) => {
        if (window.confirm('do you want to delete this invoice')) {
            const response = await axios.delete(`http://localhost:5000/invoices/${id}`);
            console.log(response);
            if (response.status === 200) {
                message.success('invoice deleted!');
                window.location.reload();
            } else {
                message.error('deleting failed');
            }
        }
    }

    return (
        <StyledCard
            size="small"
            title={invoice.name}
            extra={
                <div>
                    <Link to={`/invoices/${invoice.id}`}>View</Link>
                    <UpdateButton onClick={() => window.location.href = `/update-invoice/${invoice.id}`}>Update</UpdateButton>
                    <DeleteButton type="primary" onClick={() => deleteInvoice(invoice.id)}>Delete</DeleteButton>
                </div>
            }
        >
            <p>City: {invoice.city}</p>
            <p>Address: {invoice.address}</p>
            <p>PIB: {invoice.pib}</p>
            <Link to={`/invoices/${invoice.id}`}><p style={{ color: '#000' }}>...</p></Link>
        </StyledCard>
    )
}

export default InvoiceCard;
