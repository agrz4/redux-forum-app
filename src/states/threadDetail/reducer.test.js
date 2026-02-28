/**
 * Skenario Pengujian `threadDetailReducer`:
 * 
 * - `threadDetailReducer` function
 *  - harus mengembalikan state awal (null) ketika diberikan action yang tidak diketahui
 *  - harus mengembalikan detail thread yang baru ketika diberikan action RECEIVE_THREAD_DETAIL
 *  - harus menghapus detail thread (menjadi null) ketika diberikan action CLEAR_THREAD_DETAIL
 *  - harus menambahkan komentar ke dalam detail thread ketika diberikan action ADD_THREAD_COMMENT
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
    it('harus mengembalikan state awal ketika diberikan action yang tidak diketahui', () => {
        const initialState = null;
        const action = { type: 'UNKNOWN' };
        const nextState = threadDetailReducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it('harus mengembalikan detail thread yang baru ketika diberikan action RECEIVE_THREAD_DETAIL', () => {
        const initialState = null;
        const action = {
            type: ActionType.RECEIVE_THREAD_DETAIL,
            payload: {
                threadDetail: { id: 'thread-1', title: 'Thread 1', comments: [] }
            }
        };
        const nextState = threadDetailReducer(initialState, action);
        expect(nextState).toEqual(action.payload.threadDetail);
    });

    it('harus menghapus detail thread (menjadi null) ketika diberikan action CLEAR_THREAD_DETAIL', () => {
        const initialState = { id: 'thread-1', title: 'Thread 1', comments: [] };
        const action = {
            type: ActionType.CLEAR_THREAD_DETAIL
        };
        const nextState = threadDetailReducer(initialState, action);
        expect(nextState).toEqual(null);
    });

    it('harus menambahkan komentar ke dalam detail thread ketika diberikan action ADD_THREAD_COMMENT', () => {
        const initialState = {
            id: 'thread-1',
            title: 'Thread 1',
            comments: [
                { id: 'comment-1', content: 'Komentar 1' }
            ]
        };

        const action = {
            type: ActionType.ADD_THREAD_COMMENT,
            payload: {
                detailComment: { id: 'comment-2', content: 'Komentar 2' }
            }
        };

        const nextState = threadDetailReducer(initialState, action);

        expect(nextState).toEqual({
            ...initialState,
            comments: [action.payload.detailComment, ...initialState.comments]
        });
    });
});
