import api from '../../utils/api';
import { setIsFetchingActionCreator } from '../loading/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(setIsFetchingActionCreator(true));
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setIsFetchingActionCreator(false));
    }
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };