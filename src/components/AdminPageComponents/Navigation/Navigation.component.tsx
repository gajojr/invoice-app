import { Link } from 'react-router-dom';

import { Button } from 'antd';

import { AdminNavigation } from './Navigation.style';

const NavigationComponent = () => {
    const logOff = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <AdminNavigation>
            <Link to='/profile-page' style={{ margin: 5 }}>Go to profile page</Link>
            <Button onClick={logOff} style={{ margin: 5 }}>Log off</Button>
        </AdminNavigation>
    )
}

export default NavigationComponent;
