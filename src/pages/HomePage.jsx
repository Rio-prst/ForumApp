import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import TalksList from '../components/TalkList';

function HomePage() {
  const { threads = [], users = [] } = useSelector((state) => state);
  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = ['All', 'General', 'Tech', 'Design', 'Career', 'Random'];

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

      <TalksList talks={talkList} />
    </section>
  );
}

export default HomePage;