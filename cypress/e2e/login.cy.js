/**
 * Skenario Pengujian E2E Login:
 * 
 * - Login
 *  - harus menampilkan halaman login dengan benar
 *  - harus menampilkan window alert ketika email atau password salah
 *  - harus berhasil login dan mengarahkan ke halaman utama
 */

describe('Login spec', () => {
    beforeEach(() => {
        // Kunjungi halaman login
        cy.visit('/login');
    });

    it('harus menampilkan halaman login dengan benar', () => {
        // Pastikan elemen input email dan password tersedia
        cy.get('input[placeholder="n@example.com"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        // Tombol sign in tersedia
        cy.contains('button', 'Sign In').should('be.visible');
    });

    it('harus menampilkan window alert ketika email atau password salah', () => {
        // Ketik kredensial yang salah
        cy.get('input[placeholder="n@example.com"]').type('salah@example.com');
        cy.get('input[type="password"]').type('passwordsalah');

        // Klik tombol Sign In
        cy.contains('button', 'Sign In').click();

        // Verifikasi munculnya window alert dengan pesan error dari backend
        cy.on('window:alert', (text) => {
            expect(text).to.contains('email or password is wrong');
        });
    });

    it('harus berhasil login dan mengarahkan ke halaman utama', () => {
        // Mocking response login
        cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
            statusCode: 200,
            body: {
                status: 'success',
                message: 'Login success',
                data: {
                    token: 'mock-token-123'
                }
            }
        }).as('loginRequest');

        // Mocking response get own profile
        cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
            statusCode: 200,
            body: {
                status: 'success',
                message: 'Profile fetched',
                data: {
                    user: {
                        id: 'user-1',
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
                    }
                }
            }
        }).as('profileRequest');

        // Ketik kredensial yang valid
        cy.get('input[placeholder="n@example.com"]').type('johndoe@example.com');
        cy.get('input[type="password"]').type('password123');

        // Klik tombol Sign In
        cy.contains('button', 'Sign In').click();

        // Tunggu request selesai
        cy.wait('@loginRequest');
        cy.wait('@profileRequest');

        // Verifikasi bahwa navigasi mengarahkan kita ke halaman utama (URL '/')
        cy.url().should('eq', 'http://localhost:5173/');

        // Pastikan elemen navbar muncul (Logout biasanya dirender jika terautentikasi)
        cy.contains('button', 'Logout').should('be.visible');
    });
});
