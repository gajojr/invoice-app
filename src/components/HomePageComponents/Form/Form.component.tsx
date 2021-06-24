import { FC } from 'react';

import { Form as FormElement, Button } from 'antd';

const Form: FC = () => {
    return (
        <FormElement>
            <Button>Register</Button>
            <Button>Log In</Button>
        </FormElement>
    )
}

export default Form;
