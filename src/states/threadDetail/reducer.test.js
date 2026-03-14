/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 * - should return the initial state when given by unknown action
 * - should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
 * - should return null when given by CLEAR_THREAD_DETAIL action
 * - should return the threadDetail with the new comment when given by ADD_COMMENT action
 * - should return the threadDetail with toggled upvote thread when given by TOGGLE_UPVOTE_THREAD_DETAIL action
 * - should return the threadDetail with toggled upvote comment when given by TOGGLE_UPVOTE_COMMENT action
 *
 */

import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Test',
          body: 'Body Test',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = { id: 'thread-1', title: 'Thread Test' };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the threadDetail with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'New Comment',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([action.payload.comment]);
  });

  it('should return the threadDetail with toggled upvote thread when given by TOGGLE_UPVOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: ['user-1'], // asumsikan sebelumnya user-1 downvote
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: { userId: 'user-1' },
    };

    // action: upvote thread
    const nextState = threadDetailReducer(initialState, action);

    // assert: user-1 masuk ke upVotesBy dan dihapus dari downVotesBy
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');

    // action: toggle kembali (membatalkan upvote)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert: upVotesBy kembali kosong
    expect(nextState2.upVotesBy).not.toContain('user-1');
  });

  it('should return the threadDetail with toggled upvote comment when given by TOGGLE_UPVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action: upvote comment
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-1');

    // action: toggle kembali (membatalkan upvote comment)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2.comments[0].upVotesBy).not.toContain('user-1');
  });
});