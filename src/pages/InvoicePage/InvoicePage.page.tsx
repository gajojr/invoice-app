import { useParams } from 'react-router-dom';
import GeneratePDFButton from '../../components/InvoicePageComponents/GeneratePDFButton/GeneratePDFButton.component'

import InvoicePaper from '../../components/InvoicePageComponents/InvoicePaper/InvoicePaper.component';

const InvoicePage = () => {
    const { id }: { id: string } = useParams();

    return (
        <main>
            <GeneratePDFButton id={id} />
            <InvoicePaper id={id} />
        </main>
    )
}

export default InvoicePage;
