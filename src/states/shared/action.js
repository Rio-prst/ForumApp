import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { setIsFetchingActionCreator } from '../loading/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(setIsFetchingActionCreator(true));
    dispatch(showLoading());
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => dispatch(setIsFetchingActionCreator(false)), 500);
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersAndThreads };