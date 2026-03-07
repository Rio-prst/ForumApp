import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Send } from 'lucide-react';

function CommentInput({ authUser, addComment }) {
  const [content, setContent] = useState('');

  if (!authUser) {
    return (
      <div className='comment-input__placeholder'>
        <p>Sign in to join the discussion</p>
        <Link to='/login' className='btn-sign-in'>
          <LogIn size={18} />
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  const onCommentSubmit = () => {
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <div className='comment-input__form'>
      <textarea
        placeholder='Share your thoughts...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='comment-input__footer'>
        <button 
          type='button' 
          className='btn-reply' 
          disabled={!content.trim()}
          onClick={onCommentSubmit}
        >
          <Send size={16} />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
}

export default CommentInput;