import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        (async function () {
            const response = await axios.get('http://localhost:5000/get-profile-data', {
                params: {
                    username: localStorage.getItem('username')
                }
            });
            console.log(response);
            // remove extra /
            setAvatarURL(response.data.avatarURL.replace('//', '/', /g/));
        })();
    }, []);

    return (
        <div>
            Welcome {`${localStorage.getItem('username')}`}
            <img src={avatarURL} alt="avatar" />
        </div>
    )
}

export default ProfilePage;
