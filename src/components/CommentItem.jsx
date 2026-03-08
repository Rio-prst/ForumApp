import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { postedAt } from '../utils';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, upvote, downvote }) {
  const isUpvoted = authUser && upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className='comment-item'>
      <header className='comment-item__header'>
        <div className='comment-item__owner-info'>
          <img src={owner.avatar} alt={owner.name} className='user-avatar-small' />
          <div className='user-meta'>
            <span className='user-name'>{owner.name}</span>
            <span className='posted-at'>{postedAt(createdAt)}</span>
          </div>
        </div>
      </header>
      <div className='comment-item__body'><p>{content}</p></div>
      <footer className='comment-item__footer'>
        <div className='vote-group-split'>
          <div className={`vote-item ${isUpvoted ? 'active-up' : ''}`}>
            <button type='button' className='vote-button' onClick={() => upvote(id)}>
              <ArrowUp size={16} />
            </button>
            <span className='vote-count'>{upVotesBy.length}</span>
          </div>
          <div className={`vote-item ${isDownvoted ? 'active-down' : ''}`}>
            <button type='button' className='vote-button' onClick={() => downvote(id)}>
              <ArrowDown size={16} />
            </button>
            <span className='vote-count'>{downVotesBy.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.object,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default CommentItem;