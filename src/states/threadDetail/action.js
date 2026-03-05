import api from '../../utils/api';
import { setIsFetchingActionCreator, setIsSubmittingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
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

export { 
  ActionType, 
  receiveThreadDetailActionCreator, 
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail, 
  asyncAddComment 
};