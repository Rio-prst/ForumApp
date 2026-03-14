import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mail, Lock, Loader2 } from 'lucide-react';

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='login-input' onSubmit={onSubmit}>
      <div className='input-group'>
        <Mail className='input-icon' size={20} />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='input-group'>
        <Lock className='input-icon' size={20} />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='btn-submit-login' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className='spinner' size={18} />
            <span>Logging in...</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;