import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import { MessageSquare, UserPlus } from 'lucide-react';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  }

  return (
    <section className='register-page'>
      <div className='register-page__main'>
        <header className='register-page__header'>
          <div className='brand-logo'>
            <MessageSquare
              size={40}
              color='var(--accent-color)'
              strokeWidth={2.5}
            />
            <h1>Discuss<span>Hub</span></h1>
          </div>
          <div className='header-title'>
            <UserPlus size={20} className='text-secondary'/>
            <h2>Create Account</h2>
          </div>
          <p>Join the community and start discussing</p>
        </header>
        <article className=' register-page__body'>
          <RegisterInput register={onRegister}/>
          <div className='register-page__divider'>
            <span>or</span>
          </div>
          <p className='register-page__footer'>
            Already have an account? <Link to='/'>Sign In</Link>
          </p>
        </article>
      </div>
    </section>
  );
}

export default RegisterPage;