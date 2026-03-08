import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];

  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId } = action.payload;

        return {
          ...thread,
          upVotesBy: thread.upVotesBy.includes(userId)
            ? thread.upVotesBy.filter((id) => id !== userId)
            : [...thread.upVotesBy, userId],
          downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
        };
      }
      return thread;
    });

  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId } = action.payload;

        return {
          ...thread,
          downVotesBy: thread.downVotesBy.includes(userId)
            ? thread.downVotesBy.filter((id) => id !== userId)
            : [...thread.downVotesBy, userId],
          upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
        };
      }
      return thread;
    });

  case ActionType.NEUTRAL_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId } = action.payload;

        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
          downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
        };
      }
      return thread;
    });

  default:
    return threads;
  }
}

export default threadsReducer;