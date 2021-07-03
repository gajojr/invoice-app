import { FormElement, FormCaption, StyledButton } from './Form.style';
import { Input, message } from 'antd';
import axios from 'axios';

const Form = () => {
    const onFinish = (values: any) => {
        console.log('values', values);

        axios.post('http://localhost:5000/log-in', values)
            .then(res => {
                console.log(res)
                if (!res.data.error) {
                    message.success('logged in successfully');
                    sessionStorage.setItem('username', res.data.username);
                    window.location.href = '/profile-page';
                } else {
                    console.log(res.data.error)
                    message.error(res.data.error);
                }
            })
            .catch(err => {
                console.log(err)
                message.error('logging in failed');
            });
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Log In</FormCaption>

            <FormElement.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your username!',
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

            <StyledButton htmlType="submit">Log In</StyledButton>
        </FormElement>
    )
}

export default Form;
