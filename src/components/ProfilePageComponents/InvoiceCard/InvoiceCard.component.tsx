import { InvoiceInterface } from '../InvoiceInterface';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
    return (
        <div>
            {invoice.name}
        </div>
    )
}

export default InvoiceCard;
