import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import parse from 'html-react-parser';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import { 
  asyncReceiveThreadDetail, 
  asyncToggleUpVoteThreadDetail, 
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncAddComment 
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(asyncReceiveThreadDetail(id)); 
  }, [id, dispatch]);

  if (!threadDetail) return null;

  const isUpvoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && threadDetail.downVotesBy.includes(authUser.id);

  const onUpvoteThread = () => {
    if (!authUser) return alert('Please sign in to vote');
    if (isUpvoted) {
      dispatch(asyncToggleNeutralVoteThreadDetail());
    } else {
      dispatch(asyncToggleUpVoteThreadDetail());
    }
  };

  const onDownvoteThread = () => {
    if (!authUser) return alert('Please sign in to vote');
    if (isDownvoted) {
      dispatch(asyncToggleNeutralVoteThreadDetail());
    } else {
      dispatch(asyncToggleDownVoteThreadDetail());
    }
  };

  const onUpvoteComment = (commentId) => {
    if (!authUser) return alert('Please sign in to vote');
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (comment.upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteComment(id, commentId));
    } else {
      dispatch(asyncToggleUpVoteComment(id, commentId));
    }
  };

  const onDownvoteComment = (commentId) => {
    if (!authUser) return alert('Please sign in to vote');
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (comment.downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteComment(id, commentId));
    } else {
      dispatch(asyncToggleDownVoteComment(id, commentId));
    }
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  return (
    <section className='detail-page'>
      <article className='thread-detail'>
        <header className='thread-header'>
          <span className='talk-item__category'>{threadDetail.category}</span>
          <h2 className='thread-title'>{threadDetail.title}</h2>
          <div className='thread-owner-info'>
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className='user-avatar-small' />
            <div className='user-meta'>
              <span className='user-name'>{threadDetail.owner.name}</span>
              <span className='posted-at'>Thread Owner</span>
            </div>
          </div>
        </header>
        
        <div className='thread-body'>
          {parse(threadDetail.body)}
        </div>

        <footer className='thread-footer'>
          <div className='vote-group-split'>
            <div className={`vote-item ${isUpvoted ? 'active-up' : ''}`}>
              <button type='button' className='vote-button' onClick={onUpvoteThread}>
                <ArrowUp size={20} />
              </button>
              <span className='vote-count'>{threadDetail.upVotesBy.length}</span>
            </div>
            <div className={`vote-item ${isDownvoted ? 'active-down' : ''}`}>
              <button type='button' className='vote-button' onClick={onDownvoteThread}>
                <ArrowDown size={20} />
              </button>
              <span className='vote-count'>{threadDetail.downVotesBy.length}</span>
            </div>
          </div>
        </footer>
      </article>

      <section className='comments-section'>
        <div className='comments-header'>
          <MessageSquare size={20} />
          <h3>Discussion ({threadDetail.comments.length})</h3>
        </div>
        
        <CommentInput authUser={authUser} addComment={onAddComment} />

        <div className='comments-list'>
          {threadDetail.comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              {...comment} 
              authUser={authUser}
              upvote={onUpvoteComment} 
              downvote={onDownvoteComment} 
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default DetailPage;