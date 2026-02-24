import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className='register-input'>
      <input type='text' value={email} onChange={onEmailChange} placeholder='Email'/>
      <input type='password' value={password} onChange={onPasswordChange} placeholder='Password'/>
      <button type='button' onClick={() => register({ name, email, password })}>Login</button>
    </form>
  )
}

LoginInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default LoginInput;