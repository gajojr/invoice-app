import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoicePage = () => {
    const { id }: { id: string } = useParams();
    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:5000/invoices/${id}`, {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
        })();
    }, [id])

    return (
        <div>
            This is invoice page with id: {id}
        </div>
    )
}

export default InvoicePage;
