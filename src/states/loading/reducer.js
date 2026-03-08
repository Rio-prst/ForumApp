import { ActionType } from './action';

const initialState = { isFetching: false, isSubmitting: false };

function loadingReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.SET_IS_FETCHING:
    return { ...state, isFetching: action.payload.isFetching };
  case ActionType.SET_IS_SUBMITTING:
    return { ...state, isSubmitting: action.payload.isSubmitting };
  default:
    return state;
  }
}

export default loadingReducer;