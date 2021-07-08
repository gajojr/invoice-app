import { useEffect } from 'react';
import { RegisterPageContainer } from './RegisterPage.style';

import Form from '../../components/RegisterPageCompents/Form/Form.component';

const RegisterPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            window.location.href = '/profile-page';
        }
    }, []);

    return (
        <RegisterPageContainer>
            <Form />
        </RegisterPageContainer>
    )
}

export default RegisterPage;
