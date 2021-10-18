import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, message } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

const ProfileData = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        const clearUpTheUrl = (url: string) => {
            const clearedUpUrl = url.replace(/\\/g, '/');
            return clearedUpUrl;
        }

        (async () => {
            if (!sessionStorage.getItem('username') || !sessionStorage.getItem('token')) {
                sessionStorage.clear();
                window.location.href = '/';
            }

            try {
                const response = await axios.get('/avatar',
                    {
                        params: {
                            username: sessionStorage.getItem('username')
                        },
                        headers: {
                            'x-access-token': sessionStorage.getItem('token')
                        }
                    }
                )
                console.log(response.data);
                setAvatarURL(clearUpTheUrl(response.data));
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    message.error('Auth failed');
                } else {
                    message.error('Profile picture couldn\'t be loaded');
                }

                sessionStorage.clear();
                window.location.href = '/';
            }
        })();
    }, []);

    const logOff = () => {
        if (window.confirm('do you want to log off?')) {
            sessionStorage.clear();
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
            <StyledButton onClick={() => window.location.href = '/create-invoice'}>create new invoice</StyledButton>
        </ProfileCard>
    )
}

export default ProfileData;
