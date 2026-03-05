import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MessagesSquare } from 'lucide-react'; 
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action'; 
function LoginPage() {
  const dispatch = useDispatch();
  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <div className="login-page__main">
        <header className="login-page__header">
          <div className="brand-logo">
            <div className="logo-wrapper">
              <MessagesSquare 
                size={32} 
                color="white" 
                strokeWidth={2.5} 
              />
            </div>
            <h1>Diskusi<span>Hub</span></h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue to DiscussHub</p>
        </header>
        <article className="login-page__body">
          <LoginInput login={onLogin} />
          <div className="login-page__divider">
            <span>or</span>
          </div>
          <p className="login-page__footer">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </article>
      </div>
    </section>
  );
}

export default LoginPage;