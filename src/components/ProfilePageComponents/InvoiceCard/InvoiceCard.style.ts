import styled from 'styled-components';

import { Button } from 'antd';

export const Card = styled.article`
    display: flex;
    border: 2px solid black;
    min-width: 25vw;
    padding: 5px;
`;

export const DeleteButton = styled(Button)`
    margin-left: 5px;
    background-color: #ff3333;
    border: none;

    &:hover {
        background-color: #e60000;
    }
`;

export const UpdateButton = styled(Button)`
    margin-left: 5px;
    background-color:#00b300;
    color: #fff;
    border: none;

    &:hover {
        background-color: rgba(0, 179, 0, .8);
        color: #fff;
    }
`;