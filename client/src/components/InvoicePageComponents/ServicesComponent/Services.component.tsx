import ServiceInterface from '../ServiceInterface';
import { ServicesTable, Td, Th } from './Services.style';

const Services = ({ services, totalPriceOfAllServices }: { services: ServiceInterface[]; totalPriceOfAllServices: number; }) => {
    return (
        <div>
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
                        services.map((service: ServiceInterface) => {
                            return (
                                <tr key={service.id}>
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
        </div>
    )
}

export default Services;
