import { useState } from 'react';

import axios from 'axios';

import { FormElement, FormCaption, StyledButton, UploadButton } from './Form.style';
import { Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';

const Form = () => {
    const [files, setFiles] = useState<File[]>([]);

    const props = {
        beforeUpload: (file: File) => {
            setFiles([file]);
        },
        onRemove: (file: UploadFile<any>) => {
            setFiles([]);
        },
        onChange: (info: UploadChangeParam<UploadFile<any>>) => {
            if (info.file.status === 'done') {
                message.success('file uploaded');
            }
        },
        customRequest: (options: UploadRequestOption<any>) => {
            setTimeout(() => {
                (options as any).onSuccess('ok');
            }, 0);
        }
    };

    const onFinish = (values: any) => {
        const formData = new FormData();
        for (const name in values) {
            formData.append(name, values[name]); // there should be values.avatar which is a File object
        }

        if (!files.length) {
            message.error('File upload is required!');
            return;
        }

        if (values.password !== values.confirmPassword) {
            message.error('Passwords don\'t match!');
            return;
        }

        axios.post('/register', formData)
            .then(res => {
                console.log(res)
                if (!res.data.error) {
                    message.success('registered successfully');
                    sessionStorage.setItem('username', res.data.username);
                    sessionStorage.setItem('token', res.data.token)
                    window.location.href = '/profile-page';
                } else {
                    console.log(res.data.error)
                    message.error(res.data.error);
                }
            })
            .catch(err => {
                console.log(err)
                message.error('register failed');
            });
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

            <FormElement.Item
                name="avatar"
                valuePropName="file"
                getValueFromEvent={options => options.file.originFileObj}
            >
                <Upload
                    accept=".pdf, .jpg, .png"
                    maxCount={1}
                    {...props}
                >
                    Upload .pdf, .jpg or .png file
                    <UploadButton disabled={files.length ? true : false} icon={<UploadOutlined />}>Click to Upload</UploadButton>
                </Upload>
            </FormElement.Item>

            <StyledButton htmlType="submit">Register</StyledButton>
        </FormElement>
    )
}

export default Form;
