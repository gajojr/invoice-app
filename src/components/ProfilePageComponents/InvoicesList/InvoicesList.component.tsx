import { useState, useEffect } from 'react';
import axios from 'axios';

const InvoicesList = () => {
    const [accommodations, setAccommations] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:5000/invoices', {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
        })();
    }, []);

    if (!accommodations.length) {
        return <span>You don't have any invoices yet</span>
    }

    return (
        <div>
            <span>Your invoices:</span>
            {accommodations.map((accommodation: any) => {
                return <div>{accommodation.unit}</div>
            })}
        </div>
    )
}

export default InvoicesList;
