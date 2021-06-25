import { Link } from 'react-router-dom';
import { FormElement, StyledButton } from './Form.style';

const Form = () => {
    return (
        <FormElement>
            <h2>Invoice App</h2>
            <StyledButton>
                <Link to='/register'>Register</Link>
            </StyledButton>
            <StyledButton>
                <Link to='/log-in'>Log In</Link>
            </StyledButton>
        </FormElement>
    )
}

export default Form;
