import { useEffect } from 'react';
import Form from '../../components/LogInPageComponents/Form/Form.component';

import { LogInPageContainer } from './LogInPage.style';

const LogInPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            window.location.href = '/profile-page';
        }
    }, []);

    return (
        <LogInPageContainer>
            <Form />
        </LogInPageContainer>
    )
}

export default LogInPage;
