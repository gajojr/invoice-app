import { useState } from 'react';

import axios from 'axios';

import { FormElement, FormCaption, StyledButton } from './Form.style';
import { DatePicker, Input, Radio, message } from 'antd';

const Form = () => {
    const [stampValue, setStampValue] = useState<number>(1);
    const [signValue, setSignValue] = useState<number>(1);
    const [pdvValue, setPdvValue] = useState<number>(1);

    const onFinish = (values: any) => {
        const data = {
            ...values,
            stamp: stampValue === 1 ? true : false,
            sign: signValue === 1 ? true : false,
            pdv: pdvValue === 1 ? true : false
        }

        console.log(data);

        axios.post('http://localhost:5000/create-invoice', data, {
            params: {
                username: sessionStorage.getItem('username')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    message.success('Invoice created');
                } else {
                    message.error('Creating failed');
                }
            });
    }

    const onStampChange = (e: any) => {
        setStampValue(e.target.value);
    };

    const onSignChange = (e: any) => {
        setSignValue(e.target.value);
    };

    const onPdvChange = (e: any) => {
        setPdvValue(e.target.value);
    };

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Create invoice</FormCaption>

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

            <Radio.Group onChange={onStampChange} value={stampValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Stamp needed</Radio>
                <Radio value={2}>Stamp isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={onSignChange} value={signValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Sign needed</Radio>
                <Radio value={2}>Sign isn't needed</Radio>
                <hr />
            </Radio.Group>

            <Radio.Group onChange={onPdvChange} value={pdvValue} style={{ margin: 5 }}>
                <hr />
                <Radio value={1}>Tax gatherer is in pdv system</Radio>
                <Radio value={2}>Tax gatherer isn't in pdv system</Radio>
                <hr />
            </Radio.Group>

            <StyledButton htmlType="submit">Create invoice</StyledButton>
        </FormElement>
    )
}

export default Form;
