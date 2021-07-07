import { useParams } from 'react-router-dom';

import InvoicePaper from '../../components/InvoicePageComponents/InvoicePaper/InvoicePaper.component';

const InvoicePage = () => {
    const { id }: { id: string } = useParams();

    return (
        <main>
            <InvoicePaper id={id} />
        </main>
    )
}

export default InvoicePage;
