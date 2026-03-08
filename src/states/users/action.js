import api from '../../utils/api';
import { setIsSubmittingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(setIsSubmittingActionCreator(true));
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsSubmittingActionCreator(false));
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};