/**
 * Skenario Pengujian `asyncSetAuthUser` thunk:
 * 
 * - `asyncSetAuthUser` thunk
 *  - harus mendispatch action secara tepat saat proses login berhasil
 *  - harus memanggil window alert saat proses login gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator, asyncSetAuthUser } from './action';

const fakeErrorResponse = new Error('Email atau password salah');
const fakeAuthUserResponse = {
    id: 'user-1',
    name: 'User 1',
    email: 'user1@example.com',
    avatar: 'https://generated-image-url.jpg'
};
const fakeToken = 'secret-token';

describe('asyncSetAuthUser thunk', () => {
    beforeEach(() => {
        vi.spyOn(api, 'login');
        vi.spyOn(api, 'getOwnProfile');
        vi.spyOn(api, 'putAccessToken');
        vi.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        api.login.mockRestore();
        api.getOwnProfile.mockRestore();
        api.putAccessToken.mockRestore();
        window.alert.mockRestore();
    });

    it('harus mendispatch action secara tepat saat proses login berhasil', async () => {
        // arrange
        api.login.mockResolvedValue(fakeToken);
        api.getOwnProfile.mockResolvedValue(fakeAuthUserResponse);

        const dispatch = vi.fn();

        // action
        await asyncSetAuthUser({ email: 'user1@example.com', password: 'password123' })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(api.login).toHaveBeenCalledWith({ email: 'user1@example.com', password: 'password123' });
        expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
        expect(api.getOwnProfile).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus memanggil window alert saat proses login gagal', async () => {
        // arrange
        api.login.mockRejectedValue(fakeErrorResponse);

        const dispatch = vi.fn();

        // action
        await asyncSetAuthUser({ email: 'user1@example.com', password: 'password123' })(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
