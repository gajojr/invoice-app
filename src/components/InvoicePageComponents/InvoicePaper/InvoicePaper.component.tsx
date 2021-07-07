import { useState, useEffect } from 'react';
import axios from 'axios';

import { Paper, ServicesTable, Td, Th } from './InvoicePaper.style';

const InvoicePaper = ({ id }: { id: string }) => {
    const [invoiceData, setInvoiceData] = useState<any>({});
    const [services, setServices] = useState<any[]>([]);
    const [totalPriceOfAllServices, setTotalPriceOfAllServices] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:5000/invoices/${id}`, {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);

            setInvoiceData(response.data.exchangeData);
            setServices(response.data.services);

            setTotalPriceOfAllServices(calculatePriceOfAllServices(response.data.services));
        })();
    }, [id]);

    const calculatePriceOfAllServices = (services: any) => {
        let totalPrice = 0;
        services.map((service: any) => totalPrice += (service.amount * service.price_per_unit));

        return totalPrice;
    }

    return (
        <Paper>
            <div>From:</div>
            <h1>{invoiceData.from_name} {invoiceData.from_lastname}</h1>
            <p>{invoiceData.from_name} {invoiceData.from_lastname} {invoiceData.from_company}</p>
            <p>{invoiceData.from_address}</p>
            <p>{invoiceData.from_city} {invoiceData.from_postal_code}</p>
            <p>PIB: {invoiceData.from_pib}</p>
            <p>Giro account: {invoiceData.from_giro_account}</p>
            <p>E-mail: {invoiceData.from_email}</p>

            <hr />

            <div>To:</div>
            <p>Address: {invoiceData.to_address}</p>
            <p>City: {invoiceData.to_city}</p>
            <p>PIB: {invoiceData.to_pib}</p>

            <ServicesTable>
                <thead>
                    <tr>
                        <Th>Service type</Th>
                        <Th>Unit</Th>
                        <Th>Amount</Th>
                        <Th>Price per unit</Th>
                        <Th>total</Th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(service => {
                            return (
                                <tr>
                                    <Td>{service.service_type}</Td>
                                    <Td>{service.unit}</Td>
                                    <Td>{service.amount}</Td>
                                    <Td>{service.price_per_unit}</Td>
                                    <Td>{service.amount * service.price_per_unit}</Td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </ServicesTable>

            <hr />

            <h3>Total price of all services: {totalPriceOfAllServices}(RSD)</h3>

            <hr />

            <p>Sign needed: {invoiceData.sign_needed ? 'YES' : 'NO'}</p>
            <p>Stamp needed: {invoiceData.stamp_needed ? 'YES' : 'NO'}</p>
            <h2>PDV INFO</h2>
            <p>{invoiceData.pdv ? 'tax gatherer is in PDV system' : 'tax gatherer is not in PDV system'}</p>
        </Paper>
    )
}

export default InvoicePaper;
