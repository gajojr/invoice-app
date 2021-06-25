import styled from 'styled-components';

import { Button } from 'antd'

export const FormElement = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid gray;
    padding: 35px;
`;

export const StyledButton = styled(Button)`
    margin: 5px;
    width: 100%;
`;