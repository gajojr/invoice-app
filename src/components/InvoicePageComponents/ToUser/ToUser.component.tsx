import InvoiceDataInterface from '../InvoiceDataInterface';

const ToUser = ({ invoiceData }: { invoiceData: InvoiceDataInterface }) => {
    return (
        <div>
            <h3>To:</h3>
            <p><b>Company: {invoiceData.to_company}</b></p>
            <p>Address: {invoiceData.to_address}</p>
            <p>City: {invoiceData.to_city}</p>
            <p>PIB: {invoiceData.to_pib}</p>
        </div>
    )
}

export default ToUser;