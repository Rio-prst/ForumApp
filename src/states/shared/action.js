import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { setIsFetchingActionCreator } from '../loading/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(setIsFetchingActionCreator(true)); 
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
    }
  };
}

export { asyncPopulateUsersAndThreads };