import InvoiceDataInterface from '../InvoiceDataInterface';

const SignAndPDVInfo = ({ invoiceData }: { invoiceData: InvoiceDataInterface }) => {
    return (
        <div>
            <p>Sign needed: {invoiceData.sign_needed ? 'YES' : 'NO'}</p>
            <p>Stamp needed: {invoiceData.stamp_needed ? 'YES' : 'NO'}</p>
            <h2>PDV INFO</h2>
            <p>{invoiceData.pdv ? 'tax gatherer is in PDV system' : 'tax gatherer is not in PDV system'}</p>
        </div>
    )
}

export default SignAndPDVInfo;
