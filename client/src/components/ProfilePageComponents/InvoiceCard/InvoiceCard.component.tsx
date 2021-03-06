import axios from 'axios';

import { Link } from 'react-router-dom';

import { InvoiceInterface } from '../InvoiceInterface';

import { message } from 'antd';
import { StyledCard, DeleteButton, UpdateButton } from './InvoiceCard.style';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
    const deleteInvoice = async (id: number) => {
        if (window.confirm('do you want to delete this invoice')) {
            try {
                const response = await axios.delete(`/invoices/${id}`, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('token')
                    }
                });
                console.log(response);
                if (response.status === 200) {
                    message.success('invoice deleted!');
                    window.location.reload();
                } else {
                    message.error('deleting failed');
                }
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    message.error('Auth failed');
                } else {
                    message.error('Server error occurred');
                }

                sessionStorage.clear();
                window.location.href = '/';
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
