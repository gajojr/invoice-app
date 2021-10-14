import styled from 'styled-components';
import { Button } from 'antd';

export const ProfileCard = styled.div`
    background-color: #9fbedf;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: 5px;
    border-radius: 5px;
`;

export const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
`;

export const Username = styled.span`
    margin-right: 10px;
`;

export const StyledButton = styled(Button)`
    margin-top: 5px;
`;