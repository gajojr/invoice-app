import { useState, useEffect } from 'react';

import axios from 'axios';

import ServiceInterface from '../../CreateInvoicePageComponents/Form/ServiceInterface';
import InvoiceInterface from './InvoiceInterface';

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
            try {
                const response = await axios.get(`/invoices/${id}`, {
                    params: {
                        username: sessionStorage.getItem('username')
                    },
                    headers: {
                        'x-access-token': sessionStorage.getItem('token')
                    }
                });

                const invoiceData = response.data.exchangeData;
                const servicesData = response.data.services;

                fillInTheInputs(invoiceData);
                setServices(servicesData);

                console.log(response);
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    message.error('Auth failed');
                } else {
                    message.error('Server error occurred');
                }

                sessionStorage.clear();
                window.location.href = '/';
            }
        })();
    }, [id]);

    const fillInTheInputs = (invoiceData: InvoiceInterface) => {
        (document.getElementById('invoiceName') as HTMLInputElement).value = invoiceData.invoice_name;
        (document.getElementById('companyName') as HTMLInputElement).value = invoiceData.from_company;
        (document.getElementById('address') as HTMLInputElement).value = invoiceData.to_address;
        (document.getElementById('city') as HTMLInputElement).value = invoiceData.to_city;
        (document.getElementById('pib') as HTMLInputElement).value = invoiceData.to_pib;
        (document.getElementById('closingDate') as HTMLInputElement).value = invoiceData.closing_date;

        setStampValue(invoiceData.stamp_needed);
        setSignValue(invoiceData.sign_needed);
        setPdvValue(invoiceData.pdv);
    }

    const onFinish = async (values: any) => {
        try {
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

            const invoiceResponse = await axios.post(`/invoices/update-invoice/${id}`, data);

            console.log(invoiceResponse);

            if (invoiceResponse.status !== 200) {
                return message.error('Updating failed');
            }

            message.success('Invoice updated');

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.status === 401) {
                message.error('Auth failed');
            } else {
                message.error('Server error occurred');
            }

            sessionStorage.clear();
            window.location.href = '/';
        }
    }

    const addService = () => {
        const service_type = (document.getElementById('serviceType') as HTMLInputElement).value;
        const unit = (document.getElementById('unit') as HTMLInputElement).value;
        const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        const price_per_unit = parseFloat((document.getElementById('pricePerUnit') as HTMLInputElement).value);

        if (!checkServiceInputs(service_type, unit, amount, price_per_unit)) {
            return message.error('You must fill in all the fields to add service');
        }

        setServices([...services, { service_type, unit, amount, price_per_unit }] as ServiceInterface[]);

        cleanServiceInputs();
    }

    const checkServiceInputs = (service_type: string, unit: string, amount: number, price_per_unit: number) => {
        if (!service_type || !unit || !amount || !price_per_unit) {
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
        <FormElement onFinish={onFinish} >
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
                        message: 'Please enter the name of client\'s city!',
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
        </FormElement >
    )
}

export default Form;
