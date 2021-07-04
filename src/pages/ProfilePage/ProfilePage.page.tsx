import { ProfilePageContainer } from './ProfilePage.style';

import ProfileData from '../../components/ProfilePageComponents/ProfileData/ProfileData.component';
import InvoicesList from '../../components/ProfilePageComponents/InvoicesList/InvoicesList.component';

const ProfilePage = () => {
    return (
        <ProfilePageContainer>
            <ProfileData />
            <InvoicesList />
        </ProfilePageContainer>
    )
}

export default ProfilePage;
