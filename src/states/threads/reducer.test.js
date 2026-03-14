/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 * - should return the initial state when given by unknown action
 * - should return the threads when given by RECEIVE_THREADS action
 * - should return the threads with the new thread when given by ADD_THREAD action
 * - should return the threads with the toggled upvote thread when given by UP_VOTE_THREAD action
 * - should return the threads with the toggled downvote thread when given by DOWN_VOTE_THREAD action
 * - should return the threads with the neutralized vote thread when given by NEUTRAL_VOTE_THREAD action
 *
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Test 1',
            body: 'Body Test 1',
            category: 'React',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Test 1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Test 2',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled upvote thread when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toContain('user-1');

    // action: toggle upvote (neutralize)
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2[0].upVotesBy).not.toContain('user-1');
  });

  it('should return the threads with the toggled downvote thread when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['user-1'], // sebelumnya user-1 upvote
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: downvote thread
    const nextState = threadsReducer(initialState, action);

    // assert: harus masuk ke downVotesBy dan OTOMATIS keluar dari upVotesBy
    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });

  it('should return the threads with the neutralized vote thread when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});