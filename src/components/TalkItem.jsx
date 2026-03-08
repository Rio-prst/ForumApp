import React from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils/index.js';
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread } from '../states/threads/action';

function TalkItem({
  id,
  title,
  body,
  createdAt,
  user,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!authUser) return alert('Please, login to vote!');

    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!authUser) return alert('Please, login to vote!');

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <div className='talk-item'>
      <header className='talk-item__header'>
        <span className='talk-item__category'>{category}</span>
        <Link to={`/threads/${id}`} className='talk-item__title'>
          <h3>{title}</h3>
        </Link>
        <div className='talk-item__body'>
          {parse(body.length > 150 ? `${body.substring(0, 150)}...` : body)}
        </div>
      </header>
      <footer className='talk-item__footer'>
        <div className='talk-item__user-info'>
          <img src={user.avatar} alt={user.name} className='user-avatar-small' />
          <div className='user-meta'>
            <span className='user-name'>{user.name}</span>
            <span className='posted-at'>{postedAt(createdAt)}</span>
          </div>
        </div>
        <div className='talk-item__actions'>
          <div className='vote-group-split'>
            {/* UPVOTE SECTION */}
            <div className={`vote-item ${isUpVoted ? 'active-up' : ''}`}>
              <button type='button' className='vote-button' onClick={onUpVote}>
                <ArrowUp size={18} />
              </button>
              <span className='vote-count'>{upVotesBy.length}</span>
            </div>

            {/* DOWNVOTE SECTION */}
            <div className={`vote-item ${isDownVoted ? 'active-down' : ''}`}>
              <button type='button' className='vote-button' onClick={onDownVote}>
                <ArrowDown size={18} />
              </button>
              <span className='vote-count'>{downVotesBy.length}</span>
            </div>
          </div>

          <div className='comment-info'>
            <MessageSquare size={18} />
            <span>{totalComments}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

TalkItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default TalkItem;