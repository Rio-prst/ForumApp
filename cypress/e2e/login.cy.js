/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('roy@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('roy@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('admin123');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('nav').contains('Threads').should('be.visible');
    cy.get('button[title="Sign Out"]').should('be.visible');
  });
});