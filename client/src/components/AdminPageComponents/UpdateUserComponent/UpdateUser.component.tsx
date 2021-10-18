import axios from 'axios';

import { Input, message } from 'antd';

import { FormElement, ButtonElement } from '../DeleteUserComponent/DeleteUser.style';

const UpdateUser = () => {
    const onFinish = async (values: any) => {
        if (sessionStorage.getItem('username') === values.username) {
            message.error('You can\'t promote yourself, you are already admin!');
            return;
        }

        const response = await axios.post('/users/update-user', {
            ...values,
            adminUsername: sessionStorage.getItem('username'),
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            }
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
            return message.error('User updating failed');
        }

        message.success('User updated');
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormElement.Item
                label="Update by username"
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

            <ButtonElement htmlType="submit">Promote user to admin</ButtonElement>
        </FormElement>
    )
}

export default UpdateUser;
