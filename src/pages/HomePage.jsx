import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import TalksList from '../components/TalkList';
import SkeletonItem from '../components/SkeletonItem';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [
    'All',
    ...new Set(threads.map((thread) => thread.category))
  ];

  const talkList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  })).filter((thread) => filter === 'All' || thread.category === filter);

  return (
    <section className='home-page'>
      <header className='home-page__header'>
        <h2>Explore Discussions</h2>
        <p>Join conversations that matter to you</p>

        <div className='categories-filter'>
          {categories.map((cat) => (
            <button
              key={cat}
              className={filter === cat ? 'active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      {threads.length === 0 ? (
        <div className='talks-list'>
          {Array(6).fill(0).map((_, index) => <SkeletonItem key={index} />)}
        </div>
      ) : (
        <TalksList talks={talkList} />
      )}
    </section>
  );
}

export default HomePage;