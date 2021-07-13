import styled from 'styled-components';

import { Form, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export const FormElement = styled(Form)`
    display: flex;
    justify-content: center;
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

export const ServicePanelToggler = styled.span`
    display: flex;
    align-items: center;
`;

export const ServicesForm = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ServicesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Service = styled.div`
    display: flex;
    width: 100%;
`;

export const ServiceField = styled.span`
    border: 1px solid #000;
    padding: 2px;
    flex: 1;
`;

export const RemoveIcon = styled(CloseCircleOutlined)`
    font-size: 24px;
    margin-left: 5px;
    color: red;
    align-self: center;

    &:hover {
        cursor: pointer;
    }
`;