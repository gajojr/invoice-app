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
            try {
                const response = await axios.get('/avatar',
                    {
                        params: {
                            username: sessionStorage.getItem('username')
                        }
                    }
                )
                console.log(response.data);
                setAvatarURL(clearUpTheUrl(response.data));
            } catch (err: any) {
                message.error('Profile picture couldn\'t be loaded');
            }
        })();
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
            <StyledButton onClick={() => window.location.href = '/create-invoice'}>create new invoice</StyledButton>
        </ProfileCard>
    )
}

export default ProfileData;
