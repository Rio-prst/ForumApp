import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { MessagesSquare, Trophy, Plus, Sun, LogOut, LogIn } from 'lucide-react';

function Navigation({ authUser, signOut }) {
  return (
    <header className='navigation'>
      <div className='navigation__container'>
        <Link to='/' className='navigation__logo'>
          <div className='logo-icon-wrapper'>
            <MessagesSquare size={24} color='white' strokeWidth={2.5} />
          </div>
          <h1>Diskusi<span>Hub</span></h1>
        </Link>

        <nav className='navigation__menu'>
          {/* NavLink akan otomatis menjadi class active jika URL cocok */}
          <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <MessagesSquare size={20} />
            <span>Threads</span>
          </NavLink>
          <NavLink to='/leaderboards' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Trophy size={20} />
            <span>Leaderboard</span>
          </NavLink>
        </nav>

        <div className='navigation__actions'>
          <button className='btn-theme' title='Toggle Theme' type='button'>
            <Sun size={20} />
          </button>

          {authUser ? (
            <>
              <Link to='/new' className='btn-new-thread'>
                <Plus size={18} />
                <span>New Thread</span>
              </Link>
              <div className='user-profile'>
                <img src={authUser.avatar} alt={authUser.name} className='user-avatar-small' />
                <button onClick={signOut} className='btn-logout' title='Sign Out'>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <Link to='/login' className='btn-sign-in'>
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func,
};

export default Navigation;