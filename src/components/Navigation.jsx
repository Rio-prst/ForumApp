import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessagesSquare, Trophy, Plus, Sun, LogOut } from 'lucide-react';

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
          <Link to='/' className='nav-link active'>
            <MessagesSquare size={20} />
            <span>Threads</span>
          </Link>
          <Link to='/leaderboards' className='nav-link'>
            <Trophy size={20} />
            <span>Leaderboard</span>
          </Link>
        </nav>

        <div className='navigation__actions'>
          {authUser && (
            <>
              <Link to='/new' className='btn-new-thread'>
                <Plus size={18} />
                <span>New Thread</span>
              </Link>

              <button className='btn-theme' title='Toggle Theme' type='button'>
                <Sun size={20} />
              </button>

              <div className='user-profile'>
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  title={authUser.name}
                  className='user-avatar'
                />
                <button
                  onClick={signOut}
                  className='btn-logout'
                  title='Sign Out'
                  type='button'
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          )}

          {!authUser && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
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
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;