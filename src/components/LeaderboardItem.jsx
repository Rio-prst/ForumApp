import React from 'react';

function LeaderboardItem({ user, score, rank, isAuthUser }) {
  const getRankClass = () => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-normal';
  };

  return (
    <div className={`leaderboard-item ${rank <= 3 ? 'top-rank' : ''}`}>
      <div className="leaderboard-item__user-info">
        <div className={`rank-badge ${getRankClass()}`}>{rank}</div>
        <img src={user.avatar} alt={user.name} className='user-avatar-small' />
        <span className='user-name'>
          {user.name} {isAuthUser && <span className='you-label'>(Anda)</span>}
        </span>
      </div>
      <p className='user-score'>
        <strong>{score.toLocaleString()}</strong> <span>pts</span>
      </p>
    </div>
  );
}

export default LeaderboardItem;