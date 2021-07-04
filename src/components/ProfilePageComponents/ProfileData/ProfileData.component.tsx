import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

const ProfileData = () => {
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

    const logOff = () => {
        if (window.confirm('do you want to log off?')) {
            sessionStorage.removeItem('username');
            window.location.href = '/';
        }
    }

    return (
        <ProfileCard>
            <ProfileInfo>
                <Username>{`${sessionStorage.getItem('username')}`}</Username>
                <Image src={avatarURL} width={100} height={100} style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
            </ProfileInfo>
            <StyledButton onClick={logOff}>log off</StyledButton>
            <StyledButton onClick={() => console.log('redirecting to /create-invoice page')}>create new invoice</StyledButton>
        </ProfileCard>
    )
}

export default ProfileData;
