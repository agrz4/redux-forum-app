/**
 * Skenario Pengujian RegisterInput Component:
 * 
 * - RegisterInput Component
 *  - harus menangani pengetikan name dengan benar
 *  - harus menangani pengetikan email dengan benar
 *  - harus menangani pengetikan password dengan benar
 *  - harus memanggil fungsi register ketika tombol Sign Up ditekan
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('harus menangani pengetikan name dengan benar', async () => {
        // arrange
        render(<RegisterInput register={() => { }} />);
        const nameInput = screen.getByLabelText(/^Name/i);

        // action
        await userEvent.type(nameInput, 'Developer');

        // assert
        expect(nameInput).toHaveValue('Developer');
    });

    it('harus menangani pengetikan email dengan benar', async () => {
        // arrange
        render(<RegisterInput register={() => { }} />);
        const emailInput = screen.getByPlaceholderText('n@example.com');

        // action
        await userEvent.type(emailInput, 'test@example.com');

        // assert
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('harus menangani pengetikan password dengan benar', async () => {
        // arrange
        render(<RegisterInput register={() => { }} />);
        const passwordInput = screen.getByLabelText(/^Password/i);

        // action
        await userEvent.type(passwordInput, 'passwordtest');

        // assert
        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('harus memanggil fungsi register ketika tombol Sign Up ditekan', async () => {
        // arrange
        const mockRegister = vi.fn();
        render(<RegisterInput register={mockRegister} />);
        const nameInput = screen.getByLabelText(/^Name/i);
        const emailInput = screen.getByPlaceholderText('n@example.com');
        const passwordInput = screen.getByLabelText(/^Password/i);
        const registerButton = screen.getByRole('button', { name: 'Sign Up' });

        // action
        await userEvent.type(nameInput, 'Developer');
        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'passwordtest');
        await userEvent.click(registerButton);

        // assert
        expect(mockRegister).toHaveBeenCalledWith({
            name: 'Developer',
            email: 'test@example.com',
            password: 'passwordtest',
        });
    });
});
