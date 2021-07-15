import styled from 'styled-components';

import { Form, Button } from 'antd';

export const FormElement = styled(Form)`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 5px;
`;

export const ButtonElement = styled(Button)`
    align-self: center;
`;