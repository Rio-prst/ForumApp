import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <div className='app-container'>
        <header>
          {!hideNavbar && <Navigation authUser={authUser} signOut={onSignOut} />}
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/login'
              element={authUser ? <Navigate to='/' replace /> : <LoginPage />}
            />
            <Route
              path='/register'
              element={authUser ? <Navigate to='/' replace /> : <RegisterPage />}
            />
            <Route
              path='/threads/:id'
              element={<DetailPage/>}
            />
            <Route
              path='/new'
              element={<AddThreadPage/>}
            />
            <Route
              path='/leaderboards'
              element={<LeaderboardsPage/>}
            />
            <Route
              path='*'
              element={<Navigate to={authUser ? '/' : '/login'} replace />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;