import { useState, useEffect } from 'react';

import axios from 'axios';

import ServiceInterface from '../../CreateInvoicePageComponents/Form/ServiceInterface';

import { FormElement, FormCaption, StyledButton, ServicesForm, ServicePanelToggler, ServicesContainer, Service, ServiceField, RemoveIcon } from './Form.style';
import { DatePicker, Input, Radio, message } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const Form = ({ id }: { id: string }) => {
    const [stampValue, setStampValue] = useState<boolean>(true);
    const [signValue, setSignValue] = useState<boolean>(true);
    const [pdvValue, setPdvValue] = useState<boolean>(true);
    const [servicePanelOpen, setServicePanelOpen] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceInterface[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:5000/invoices-to-update/${id}`);

            const invoiceData = response.data.invoice;
            const servicesData = response.data.services;

            fillInTheInputs(invoiceData);
            setServices(servicesData);

            console.log(response);
        })();
    }, []);

    const fillInTheInputs = (invoiceData: any) => {
        console.log(invoiceData.name);

        (document.getElementById('invoiceName') as HTMLInputElement).value = invoiceData.name;
        (document.getElementById('companyName') as HTMLInputElement).value = invoiceData.company_name;
        (document.getElementById('address') as HTMLInputElement).value = invoiceData.client_address;
        (document.getElementById('city') as HTMLInputElement).value = invoiceData.client_city;
        (document.getElementById('pib') as HTMLInputElement).value = invoiceData.client_pib;
        (document.getElementById('closingDate') as HTMLInputElement).value = invoiceData.closing_date;

        setStampValue(invoiceData.stamp_needed);
        setSignValue(invoiceData.sign_needed);
        setPdvValue(invoiceData.pdv);
    }

    const onFinish = async (values: any) => {
        // close services panel because of inputs
        setServicePanelOpen(false);

        const data = {
            ...values,
            stamp: stampValue,
            sign: signValue,
            pdv: pdvValue,
            services
        }

        console.log(data);

        const invoiceResponse = await axios.post(`http://localhost:5000/update-invoice/${id}`, data);

        console.log(invoiceResponse);

        if (invoiceResponse.status !== 200) {
            return message.error('Updating failed');
        }

        message.success('Invoice updated');

        window.location.reload();
    }

    const addService = () => {
        const type = (document.getElementById('serviceType') as HTMLInputElement).value;
        const unit = (document.getElementById('unit') as HTMLInputElement).value;
        const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        const pricePerUnit = parseFloat((document.getElementById('pricePerUnit') as HTMLInputElement).value);

        if (!checkServiceInputs(type, unit, amount, pricePerUnit)) {
            return message.error('You must fill in all the fields to add service');
        }

        setServices([...services, { type, unit, amount, pricePerUnit }] as ServiceInterface[]);

        cleanServiceInputs();
    }

    const checkServiceInputs = (type: string, unit: string, amount: number, pricePerUnit: number) => {
        if (!type || !unit || !amount || !pricePerUnit) {
            return false;
        }

        return true;
    }

    const cleanServiceInputs = () => {
        // empty all inputs for service creation
        (document.getElementById('serviceType') as HTMLInputElement).value = '';
        (document.getElementById('unit') as HTMLInputElement).value = '';
        (document.getElementById('amount') as HTMLInputElement).value = '';
        (document.getElementById('pricePerUnit') as HTMLInputElement).value = '';
    }

    const removeService = (idx: number) => {
        if (window.confirm('Do you want to remove this service?')) {
            const newServices = services.filter((service: ServiceInterface, index: number) => idx !== index);
            setServices(newServices);
        }
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Update invoice</FormCaption>

            <FormElement.Item
                label="Invoice name"
                name="invoiceName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your invoice name!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: company name"
                name="companyName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name of company!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the address of client!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: city"
                name="city"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name of client\' city!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="To: PIB"
                name="pib"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the client\'s pib!',
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Closing date"
                name="closingDate"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the closing date!',
                    },
                ]}
            >
                <DatePicker />
            </FormElement.Item>

            <ServicePanelToggler>Add service
                {
                    servicePanelOpen
                        ? <CaretUpOutlined onClick={() => setServicePanelOpen(!servicePanelOpen)} style={{ fontSize: '32px', color: '#08c' }} />
                        : <CaretDownOutlined onClick={() => setServicePanelOpen(!servicePanelOpen)} style={{ fontSize: '32px', color: '#08c' }} />
                }
            </ServicePanelToggler>

            <ServicesForm style={{ display: `${servicePanelOpen ? 'flex' : 'none'}` }}>
                <FormElement.Item
                    label="Service type:"
                    name="serviceType"
                    id="serviceType"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Unit:"
                    name="unit"
                    id="unit"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Amount:"
                    name="amount"
                    id="amount"
                >
                    <Input />
                </FormElement.Item>

                <FormElement.Item
                    label="Price per unit:"
                    name="pricePerUnit"
                    id="pricePerUnit"
                >
                    <Input />
                </FormElement.Item>

                <StyledButton onClick={() => {
                    addService();
                    setServicePanelOpen(!servicePanelOpen);
                }}>Add service</StyledButton>
            </ServicesForm>

            {
                services.length
                    ? <ServicesContainer>
                        <p>Services:</p>
                        {services.map((service: ServiceInterface, idx: number) => (
                            <Service key={idx}>
                                <ServiceField>{service.service_type}</ServiceField>
                                <ServiceField>{service.unit}</ServiceField>
                                <ServiceField>{service.amount}</ServiceField>
                                <ServiceField>{service.price_per_unit}</ServiceField>
                                <RemoveIcon onClick={() => removeService(idx)} />
                            </Service>
                        ))}
                    </ServicesContainer>
                    : null
            }

            <Radio.Group onChange={(e: any) => setStampValue(e.target.value)} value={stampValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={true}>Stamp needed</Radio>
                <Radio value={false}>Stamp isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={(e: any) => setSignValue(e.target.value)} value={signValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={true}>Sign needed</Radio>
                <Radio value={false}>Sign isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={(e: any) => setPdvValue(e.target.value)} value={pdvValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={true}>Tax gatherer is in pdv system</Radio>
                <Radio value={false}>Tax gatherer isn't in pdv system</Radio>
                <hr />
            </Radio.Group>

            <StyledButton htmlType="submit">Update invoice</StyledButton>
        </FormElement>
    )
}

export default Form;
