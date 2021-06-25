import { FormElement, FormCaption, StyledButton } from './Form.style';
import { Input } from 'antd';

// interface FormData {
//     firstName: string;
//     lastName: string;
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
    // change values type to FormData
    const onFinish = (values: any) => {
        Object.values(values).map(value => console.log(typeof value));
        console.log(values);
        console.log(values instanceof FormData);
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
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your password!',
                    },
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
                        message: 'Please enter your email account!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <StyledButton htmlType="submit">Register</StyledButton>
        </FormElement>
    )
}

export default Form;
