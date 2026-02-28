/**
 * Skenario Pengujian `threadsReducer`:
 * 
 * - `threadsReducer` function
 *  - harus mengembalikan state awal ketika diberikan action yang tidak diketahui
 *  - harus mengembalikan state threads yang baru ketika diberikan action RECEIVE_THREADS
 *  - harus menambahkan thread baru ke dalam state threads ketika diberikan action ADD_THREAD
 *  - harus meng-upvote thread ketika diberikan action UPVOTE_THREAD
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
    it('harus mengembalikan state awal ketika diberikan action yang tidak diketahui', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN' };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it('harus mengembalikan state threads yang baru ketika diberikan action RECEIVE_THREADS', () => {
        const initialState = [];
        const action = {
            type: ActionType.RECEIVE_THREADS,
            payload: {
                threads: [
                    { id: 'thread-1', title: 'Thread 1' },
                    { id: 'thread-2', title: 'Thread 2' }
                ]
            }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual(action.payload.threads);
    });

    it('harus menambahkan thread baru ke dalam state threads ketika diberikan action ADD_THREAD', () => {
        const initialState = [{ id: 'thread-1', title: 'Thread 1' }];
        const action = {
            type: ActionType.ADD_THREAD,
            payload: {
                thread: { id: 'thread-2', title: 'Thread 2' }
            }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual([action.payload.thread, ...initialState]);
    });

    it('harus meng-upvote thread ketika diberikan action UPVOTE_THREAD', () => {
        const initialState = [
            {
                id: 'thread-1',
                title: 'Thread 1',
                upVotesBy: [],
                downVotesBy: []
            }
        ];

        const action = {
            type: ActionType.UPVOTE_THREAD,
            payload: {
                threadId: 'thread-1',
                userId: 'user-1'
            }
        };

        const nextState = threadsReducer(initialState, action);

        expect(nextState).toEqual([
            {
                ...initialState[0],
                upVotesBy: ['user-1']
            }
        ]);
    });
});
