import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import { MessageSquare } from 'lucide-react';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    await dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <section className='register-page'>
      <div className='register-page__main'>
        <div className='brand-logo'>
          <div className='logo-wrapper'>
            <MessageSquare size={28} color='white' strokeWidth={2.5} />
          </div>
          <h1>Diskusi<span>Hub</span></h1>
        </div>
        <header className='register-page__header'>
          <h2>Create Your Account</h2>
          <p>Join the community and start discussing</p>
        </header>
        <article className='register-page__body'>
          <RegisterInput register={onRegister} />
          <div className='register-page__divider'>
            <span>or</span>
          </div>
          <p className='register-page__footer'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </article>
      </div>
    </section>
  );
}

export default RegisterPage;