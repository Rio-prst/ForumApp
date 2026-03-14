/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { setIsFetchingActionCreator } from '../loading/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test 1',
    body: 'Body Test 1',
    category: 'React',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    createdAt: '2022-09-22T10:06:55.588Z',
    ownerId: 'user-1',
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;

    vi.useRealTimers();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // Jalankan timer untuk menguji setTimeout setIsFetchingActionCreator(false)
    vi.runAllTimers();
    expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(false));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // Jalankan timer
    vi.runAllTimers();
    expect(dispatch).toHaveBeenCalledWith(setIsFetchingActionCreator(false));
  });
});