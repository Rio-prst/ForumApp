/**
 * - Login spec
 * - should display login page correctly
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('roy@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });

    cy.get('button').contains(/^Login$/).click();
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('roy@gmail.com');
    cy.get('input[placeholder="Password"]').type('admin123');

    cy.get('button').contains(/^Login$/).click();

    cy.contains('DiskusiHub', { timeout: 15000 }).should('be.visible');
  });
});