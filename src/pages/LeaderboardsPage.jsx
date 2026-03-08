import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy } from 'lucide-react';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import Loading from '../components/Loading';

function LeaderboardsPage() {
  const {
    leaderboards = [],
    authUser = null
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (leaderboards.length === 0) {
    return (
      <div className='loading-container'>
        <Loading/>
      </div>
    );
  }

  return (
    <section className='leaderboards-page'>
      <header className='leaderboards-header'>
        <Trophy size={32} color='#6366F1' />
        <h2>Leaderboard</h2>
      </header>

      <div className='leaderboards-list'>
        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            user={item.user}
            score={item.score}
            rank={index + 1}
            isAuthUser={authUser && item.user.id === authUser.id}
          />
        ))}
      </div>
    </section>
  );
}

export default LeaderboardsPage;