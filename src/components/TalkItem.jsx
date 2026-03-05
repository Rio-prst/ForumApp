import React from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index.js';

function TalkItem({ 
  title, 
  body, 
  createdAt, 
  user, 
  category, 
  upVotesBy, 
  downVotesBy, 
  totalComments 
}) {
  return (
    <div className="talk-item">
      <header className="talk-item__header">
        <span className="talk-item__category">{category}</span>
        <h3 className="talk-item__title">{title}</h3>
        <div className="talk-item__body">
          {parse(body.length > 150 ? `${body.substring(0, 150)}...` : body)}
        </div>
      </header> 
      <footer className="talk-item__footer">
        <div className="talk-item__user-info">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar-small" 
          />
          <div className="user-meta">
            <span className="user-name">{user.name}</span>
            <span className="posted-at">{postedAt(createdAt)}</span>
          </div>
        </div>
        <div className="talk-item__actions">
          <div className="vote-group">
            <button type="button" className="vote-button">
              <ArrowUp size={18} />
            </button>
            <span className="vote-count">{upVotesBy.length - downVotesBy.length}</span>
            <button type="button" className="vote-button">
              <ArrowDown size={18} />
            </button>
          </div>
          <div className="comment-info">
            <MessageSquare size={18} />
            <span>{totalComments}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

TalkItem.propTypes = {
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