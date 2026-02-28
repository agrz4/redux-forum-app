/**
 * Skenario Pengujian `asyncAddThread` thunk:
 * 
 * - `asyncAddThread` thunk
 *  - harus mendispatch action secara tepat ketika payload sukses
 *  - harus menampilkan window alert ketika payload gagal diterima
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { addThreadActionCreator, asyncAddThread } from './action';

const fakeErrorResponse = new Error('Terjadi kesalahan');
const fakeThreadResponse = {
    id: 'thread-1',
    title: 'Sebuah Thread',
    body: 'Isi thread ini sangat menarik.',
    category: 'General',
    createdAt: '2023-05-29T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
};

describe('asyncAddThread thunk', () => {
    beforeEach(() => {
        vi.spyOn(api, 'createThread');
        vi.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        api.createThread.mockRestore();
        window.alert.mockRestore();
    });

    it('harus mendispatch action secara tepat dan memanggil success callback ketika menambahkan thread berhasil', async () => {
        // arrange
        api.createThread.mockResolvedValue(fakeThreadResponse);

        const dispatch = vi.fn();
        const successCallback = vi.fn();

        // action
        await asyncAddThread({
            title: 'Sebuah Thread',
            body: 'Isi thread ini sangat menarik.',
            category: 'General',
            successCallback
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(api.createThread).toHaveBeenCalledWith({
            title: 'Sebuah Thread',
            body: 'Isi thread ini sangat menarik.',
            category: 'General'
        });
        expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse));
        expect(successCallback).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus memanggil window alert ketika menambahkan thread gagal', async () => {
        // arrange
        api.createThread.mockRejectedValue(fakeErrorResponse);

        const dispatch = vi.fn();
        const successCallback = vi.fn();

        // action
        await asyncAddThread({
            title: 'Sebuah Thread',
            body: 'Isi thread ini sangat menarik.',
            category: 'General',
            successCallback
        })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(successCallback).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
