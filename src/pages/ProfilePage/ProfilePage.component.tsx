import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        axios
            .get(
                `http://localhost:5000/get-avatar`,
                {
                    params: {
                        username: sessionStorage.getItem('username')
                    },
                    responseType: 'arraybuffer'
                }
            )
            .then(response => {
                console.log(response);
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                setAvatarURL("data:;base64," + base64);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            Welcome {`${sessionStorage.getItem('username')}`}
            <img src={avatarURL} style={{ width: 200, height: 200 }} alt="avatar" />
        </div>
    )
}

export default ProfilePage;
