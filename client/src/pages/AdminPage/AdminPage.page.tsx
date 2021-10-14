import { useEffect } from 'react';

import DeleteUserComponent from '../../components/AdminPageComponents/DeleteUserComponent/DeleteUser.component';
import UpdateUserComponent from '../../components/AdminPageComponents/UpdateUserComponent/UpdateUser.component';
import NavigationComponent from '../../components/AdminPageComponents/Navigation/Navigation.component';

import { AdminPageContainer } from './AdminPage.style';

const AdminPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== 'admin') {
            window.location.href = '/';
        }
    }, []);

    return (
        <AdminPageContainer>
            <NavigationComponent />
            <DeleteUserComponent />
            <UpdateUserComponent />
        </AdminPageContainer>
    )
}

export default AdminPage;
