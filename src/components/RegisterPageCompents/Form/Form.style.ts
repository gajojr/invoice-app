import styled from 'styled-components';

import { Form, Button } from 'antd';

export const FormElement = styled(Form)`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    border: 2px solid gray;
    padding: 35px;
`;

export const FormCaption = styled.h2`
    align-self: center;
    margin-bottom: 25px;
`;

export const StyledButton = styled(Button)`
    margin: 5px;
    width: 70%;
    align-self: center;
`;