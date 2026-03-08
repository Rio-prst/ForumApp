import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add thread: ', error);
      });
  };

  return (
    <section className="add-thread-page">
      <div className="add-thread-container">
        <header className="add-thread-header">
          <h2>Create New Discussion</h2>
          <p>Share your thoughts with the community</p>
        </header>

        <ThreadInput addThread={onAddThread} />
      </div>
    </section>
  );
}

export default AddThreadPage;