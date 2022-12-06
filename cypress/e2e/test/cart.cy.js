/// <reference types="cypress"/>
import Auth from '../page/auth.page';
import Cart from '../page/cart.page';
import loginData from '../data/login.data';
import { products } from '../data/product.data';

describe('Add to Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add a single product to cart', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);

    Cart.addToCart(products[0].name);
    Cart.navigateToCart();

    cy.get(Cart.cartNotification).should('have.text', 1);
    cy.get(Cart.cartQuantity).should('have.text', 1);
    cy.get(Cart.removeSauceLabBackPackBtn).should('be.visible');
    cy.get(Cart.cartItemsName).should('have.text', products[0].name);
  });

  it('Remove one item from cart', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);

    Cart.addToCart(products[0].name);
    Cart.navigateToCart();

    cy.get(Cart.cartQuantity).should('have.text', 1);
    cy.get(Cart.cartItemsName).should('have.text', products[0].name);
    cy.get(Cart.removeSauceLabBackPackBtn).click();

    cy.get(Cart.cartItemsName).should('not.exist');
    cy.get(Cart.removedCartItem).should('exist');
  });

  it('Add multiple items to cart', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);

    Cart.addToCart(products[0].name);
    Cart.addToCart(products[1].name);
    Cart.navigateToCart();

    cy.get(Cart.cartNotification).should('have.text', 2);
    cy.get(Cart.cartQuantity).each(($el) => {
      cy.wrap($el).should('have.text', 1);
    });
    cy.get(Cart.removeSauceLabBackPackBtn).should('be.visible');
    cy.get(Cart.cartItemsName).each(($el, index) => {
      cy.wrap($el).should('have.text', products[index].name);
    });
  });

  it('Remove multiple items from cart', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);

    Cart.addToCart(products[0].name);
    Cart.addToCart(products[1].name);
    Cart.navigateToCart();

    cy.get(Cart.cartQuantity).each(($el) => {
      cy.wrap($el).should('have.text', 1);
    });
    cy.get(Cart.cartItemsName).each(($el, index) => {
      cy.wrap($el).should('have.text', products[index].name);
    });
    Cart.removeFromCart(products[0].name);
    Cart.removeFromCart(products[1].name);

    cy.get(Cart.cartItemsName).should('not.exist');
    cy.get(Cart.removedCartItem).each(($el) => {
      cy.wrap($el).should('exist');
    });
  });
});
