import React from 'react';
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
export default CommentItem;