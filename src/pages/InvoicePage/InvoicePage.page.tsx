import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from 'antd';

import InvoicePaper from '../../components/InvoicePageComponents/InvoicePaper/InvoicePaper.component';

const InvoicePage = () => {
    const { id }: { id: string } = useParams();

    const generatePDF = () => {
        const input = document.querySelector('.invoice-paper');
        html2canvas(input as HTMLElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0, 0, 200);
                pdf.save(`invoice-${sessionStorage.getItem('username')}-${id}.pdf`);
            });
    }

    return (
        <main>
            <Button type="primary" onClick={generatePDF}>Generate PDF</Button>
            <InvoicePaper id={id} />
        </main>
    )
}

export default InvoicePage;
