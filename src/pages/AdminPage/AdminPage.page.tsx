import { useEffect } from 'react';

const AdminPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== 'admin') {
            window.location.href = '/';
        }
    }, []);

    return (
        <div>
            This is admin page
        </div>
    )
}

export default AdminPage;
