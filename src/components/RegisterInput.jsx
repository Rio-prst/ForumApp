import React from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Lock } from 'lucide-react';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className='login-input' onSubmit={onSubmit}>
      <div className='input-field-group'>
        <label className='input-label'>Name</label>
        <div className='input-group'>
          <User className='input-icon' size={18} />
          <input
            type='text'
            value={name}
            onChange={onNameChange}
            placeholder='Your full name'
            required
          />
        </div>
      </div>

      <div className='input-field-group'>
        <label className='input-label'>Email</label>
        <div className='input-group'>
          <Mail className='input-icon' size={18} />
          <input
            type='email'
            value={email}
            onChange={onEmailChange}
            placeholder='you@example.com'
            required
          />
        </div>
      </div>

      <div className='input-field-group'>
        <label className='input-label'>Password</label>
        <div className='input-group'>
          <Lock className='input-icon' size={18} />
          <input
            type='password'
            value={password}
            onChange={onPasswordChange}
            placeholder='••••••••'
            required
          />
        </div>
      </div>

      <button type='button' className='btn-submit-login' onClick={onSubmit}>
        Create Account
      </button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;