import InvoiceDataInterface from '../InvoiceDataInterface';

const FromUser = ({ invoiceData }: { invoiceData: InvoiceDataInterface }) => {
    return (
        <div>
            <h3>From:</h3>
            <h1>{invoiceData.from_name} {invoiceData.from_lastname}</h1>
            <p>{invoiceData.from_name} {invoiceData.from_lastname} {invoiceData.from_company}</p>
            <p>{invoiceData.from_address}</p>
            <p>{invoiceData.from_city} {invoiceData.from_postal_code}</p>
            <p>PIB: {invoiceData.from_pib}</p>
            <p>Giro account: {invoiceData.from_giro_account}</p>
            <p>E-mail: {invoiceData.from_email}</p>

            <hr />
        </div>
    )
}

export default FromUser;
