import { useState } from 'react';

import axios from 'axios';

import { FormElement, FormCaption, StyledButton, UploadButton } from './Form.style';
import { Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// interface FormData {
//     firstName: string;
//     lastName: string;
//     username: string;
//     password: string;
//     confirmPassword: string;
//     address: string;
//     city: string;
//     postalCode: string;
//     companyName: string;
//     pib: string;
//     giroAccount: string;
//     email: string;
// }

const Form = () => {
    const [files, setFiles] = useState<File[]>([]);

    const props = {
        name: 'file',
        beforeUpload: (file: any) => {
            setFiles([file]);
            return false;
        },
        onRemove: (file: any) => {
            setFiles([]);
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    // change values type to FormData
    const onFinish = (values: any) => {
        if (!files.length) {
            message.error('File upload is required');
            return;
        }
        console.log(values);

        axios.post('http://localhost:5000/register', values);
        // Object.values(values).map(value => console.log(typeof value));
        // console.log(values instanceof FormData);
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Register</FormCaption>

            <FormElement.Item
                label="First name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your first name!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Last name"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your last name!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the username!',
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'Must be between 6 and 20 characters'
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the password!',
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'Must be between 6 and 20 characters'
                    }
                ]}
            >
                <Input.Password />
            </FormElement.Item>

            <FormElement.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'Must be between 6 and 20 characters'
                    }
                ]}
            >
                <Input.Password />
            </FormElement.Item>

            <FormElement.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your address!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="City"
                name="city"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your city!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Postal code"
                name="postalCode"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your postal code!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Company name"
                name="companyName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your company name!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="PIB"
                name="pib"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your pib!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Giro account"
                name="giroAccount"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your giro account!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <FormElement.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <Upload
                accept=".pdf, .jpg, .png"
                {...props}
            >
                Upload .pdf, .jpg or .png file
                <UploadButton disabled={files.length ? true : false} icon={<UploadOutlined />}>Click to Upload</UploadButton>
            </Upload>

            <StyledButton htmlType="submit">Register</StyledButton>
        </FormElement>
    )
}

export default Form;
