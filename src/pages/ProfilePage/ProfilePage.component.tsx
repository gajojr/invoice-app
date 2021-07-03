import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        (async function () {
            const response = await axios.get('http://localhost:5000/get-profile-data', {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
            // whole address -> server/uploads/file.jpg
            const serverURL = response.data.avatarURL;

            axios
                .get(
                    `http://localhost:5000/get-avatar`,
                    {
                        params: {
                            avatarURL: serverURL.substr(serverURL.lastIndexOf('\\') + 1, serverURL.length)
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
        })();
    }, []);

    return (
        <div>
            Welcome {`${sessionStorage.getItem('username')}`}
            <img src={avatarURL} alt="avatar" />
        </div>
    )
}

export default ProfilePage;
