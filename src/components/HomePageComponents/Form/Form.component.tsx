import { Form as FormElement, Button } from 'antd';

const Form = () => {
    return (
        <FormElement className="flex justify-center items-center flex-col border-2 p-10">
            <Button>Register</Button>
            <Button>Log In</Button>
        </FormElement>
    )
}

export default Form;
