/**
 * Skenario Pengujian LoginInput Component:
 * 
 * - LoginInput Component
 *  - harus menangani pengetikan email dengan benar
 *  - harus menangani pengetikan password dengan benar
 *  - harus memanggil fungsi login ketika tombol Sign In ditekan
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('harus menangani pengetikan email dengan benar', async () => {
        // arrange
        render(<LoginInput login={() => { }} />);
        const emailInput = screen.getByPlaceholderText('n@example.com');

        // action
        await userEvent.type(emailInput, 'test@example.com');

        // assert
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('harus menangani pengetikan password dengan benar', async () => {
        // arrange
        render(<LoginInput login={() => { }} />);

        // match label with regex to handle the '*' from isRequired
        const passwordInput = screen.getByLabelText(/^Password/i);

        // action
        await userEvent.type(passwordInput, 'passwordtest');

        // assert
        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('harus memanggil fungsi login ketika tombol Sign In ditekan', async () => {
        // arrange
        const mockLogin = vi.fn();
        render(<LoginInput login={mockLogin} />);
        const emailInput = screen.getByPlaceholderText('n@example.com');
        const passwordInput = screen.getByLabelText(/^Password/i);
        const loginButton = screen.getByRole('button', { name: 'Sign In' });

        // action
        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'passwordtest');
        await userEvent.click(loginButton);

        // assert
        expect(mockLogin).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'passwordtest',
        });
    });
});
