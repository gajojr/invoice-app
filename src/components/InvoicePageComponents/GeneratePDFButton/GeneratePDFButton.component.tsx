import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from 'antd';

const GeneratePDFButton = ({ id }: { id: string; }) => {
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
        <Button type="primary" onClick={generatePDF}>Generate PDF</Button>
    )
}

export default GeneratePDFButton;
