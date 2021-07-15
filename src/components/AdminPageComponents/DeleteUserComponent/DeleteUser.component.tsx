import { Input, message } from 'antd';

import axios from 'axios';

import { FormElement, ButtonElement } from './DeleteUser.style';

const DeleteUserComponent = () => {
    const onFinish = async (values: any) => {
        if (sessionStorage.getItem('username') === values.username) {
            if (!window.confirm('You are deleteing this account, proceed?')) {
                return;
            }
        }

        const response = await axios.delete(`http://localhost:5000/delete-user`, {
            params: { ...values, adminUsername: sessionStorage.getItem('username') }
        });
        console.log(response);

        if (response.data.redirect) {
            sessionStorage.clear();
            window.location.href = '/';
            return;
        }

        if (response.data.error) {
            return message.error(response.data.error);
        }

        if (response.status !== 200) {
            return message.error('User deleting failed');
        }

        message.success('User deleted');
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormElement.Item
                label="Delete by username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the username!',
                    },
                ]}
            >
                <Input />
            </FormElement.Item>

            <ButtonElement htmlType="submit">Delete user</ButtonElement>
        </FormElement>
    )
}

export default DeleteUserComponent;