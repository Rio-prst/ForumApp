/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 * * - asyncToggleUpVoteThreadDetail thunk
 * - should dispatch action correctly and call api
 * - should dispatch action and call alert correctly when api failed (optimistic update)
 */

import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  ActionType
} from './action';
import { setIsFetchingActionCreator } from '../loading/action';

describe('Thread Detail Thunk', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
    api._toggleUpVoteThread = api.toggleUpVoteThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;
    api.toggleUpVoteThread = api._toggleUpVoteThread;
    delete api._getDetailThread;
    delete api._toggleUpVoteThread;
  });

  describe('asyncReceiveThreadDetail thunk', () => {
    it('should dispatch action correctly when data fetching success', async () => {
      // arrange
      const fakeThreadDetail = { id: 'thread-1', title: 'Test' };
      api.getDetailThread = () => Promise.resolve(fakeThreadDetail);
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreadDetail('thread-1')(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(true));
      expect(dispatch).toHaveBeenCalledWith({ type: ActionType.CLEAR_THREAD_DETAIL });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: { threadDetail: fakeThreadDetail }
      });
      expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(false));
    });
  });

  describe('asyncToggleUpVoteThreadDetail thunk', () => {
    it('should dispatch action correctly and call alert correctly when api failed', async () => {
      // arrange
      const authUser = { id: 'user-1' };
      const threadDetail = { id: 'thread-1' };
      const fakeError = new Error('Network Error');

      api.toggleUpVoteThread = () => Promise.reject(fakeError);

      const dispatch = vi.fn();
      const getState = () => ({ authUser, threadDetail });
      window.alert = vi.fn();

      // action
      await asyncToggleUpVoteThreadDetail()(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
        payload: { userId: authUser.id }
      });

      expect(window.alert).toHaveBeenCalledWith(fakeError.message);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
        payload: { userId: authUser.id }
      });
    });
  });
});