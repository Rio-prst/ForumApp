import api from '../../utils/api';
import { setIsFetchingActionCreator, setIsSubmittingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL, payload: { userId } };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL, payload: { userId } };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL, payload: { userId } };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_COMMENT, payload: { commentId, userId } };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_COMMENT, payload: { commentId, userId } };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.NEUTRALIZE_VOTE_COMMENT, payload: { commentId, userId } };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(setIsFetchingActionCreator(true));
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsFetchingActionCreator(false));
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(setIsSubmittingActionCreator(true));
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsSubmittingActionCreator(false));
    }
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.toggleUpVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.toggleDownVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.toggleNeutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(asyncReceiveThreadDetail(threadDetail.id));
    }
  };
}

function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleUpVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleDownVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return alert('Please sign in to vote');
    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleNeutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
};