/// <reference types="cypress"/>
import Auth from '../page/auth.page';
import routesData from '../data/routes.data';
import loginData from '../data/login.data';

describe('Data driven login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Successful Login with a valid user', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    cy.get(Auth.itemNames).should('be.visible');
    cy.url().should('contain', routesData.product);
  });

  it('Failed Login with a locked user', () => {
    Auth.login(
      loginData.lockedOutUser.username,
      loginData.lockedOutUser.password
    );
    cy.get(Auth.errorMessage).should('be.visible');
    cy.get(Auth.errorMessage).should(
      'have.text',
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  it('Failed Login with an invalid user', () => {
    Auth.login(loginData.invalidUser.username, loginData.invalidUser.password);
    cy.get(Auth.errorMessage).should('be.visible');
    cy.get(Auth.errorMessage).should(
      'have.text',
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
