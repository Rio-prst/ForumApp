import api from '../../utils/api';
import { setIsSubmittingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(setIsSubmittingActionCreator(true));
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsSubmittingActionCreator(false));
    }
  };
}

export { 
  ActionType, 
  receiveThreadsActionCreator, 
  addThreadActionCreator, 
  asyncAddThread 
};