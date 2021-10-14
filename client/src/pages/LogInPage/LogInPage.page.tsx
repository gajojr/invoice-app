import { useEffect } from 'react';
import Form from '../../components/LogInPageComponents/Form/Form.component';

import { LogInPageContainer } from './LogInPage.style';

const LogInPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            window.location.href = sessionStorage.getItem('role') === 'admin' ? '/admin-page' : '/profile-page';
        }
    }, []);

    return (
        <LogInPageContainer>
            <Form />
        </LogInPageContainer>
    )
}

export default LogInPage;
