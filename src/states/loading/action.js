const ActionType = {
  SET_IS_FETCHING: 'SET_IS_FETCHING',
  SET_IS_SUBMITTING: 'SET_IS_SUBMITTING',
};

function setIsFetchingActionCreator(isFetching) {
  return { type: ActionType.SET_IS_FETCHING, payload: { isFetching } };
}

function setIsSubmittingActionCreator(isSubmitting) {
  return { type: ActionType.SET_IS_SUBMITTING, payload: { isSubmitting } };
}

export { ActionType, setIsFetchingActionCreator, setIsSubmittingActionCreator };