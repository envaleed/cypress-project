/// <reference types="cypress"/>
import Auth from '../page/auth.page';
import Cart from '../page/cart.page';
import CheckoutInfo from '../page/checkout/checkout-info.page';
import CheckoutOverview from '../page/checkout/checkout-overview.page';
import loginData from '../data/login.data';
import { products } from '../data/product.data';
import routesData from '../data/routes.data';
import errorMessages from '../data/errors.data';
import CheckoutComplete from '../page/checkout/checkout-complete.page';

describe('Checkout Info', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify Error Messages', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    Cart.addToCart(products[0].name);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.url().should('contain', routesData.checkout_step_one);

    cy.get(CheckoutInfo.continueButton).click();
    cy.get(CheckoutInfo.errorMessage).should(
      'have.text',
      errorMessages.firstNameError
    );

    cy.get(CheckoutInfo.firstName).type('Marlo');
    cy.get(CheckoutInfo.continueButton).click();

    cy.get(CheckoutInfo.errorMessage).should(
      'have.text',
      errorMessages.lastNameError
    );

    cy.get(CheckoutInfo.lastName).type('Jolo');
    cy.get(CheckoutInfo.continueButton).click();

    cy.get(CheckoutInfo.errorMessage).should(
      'have.text',
      errorMessages.postalCodeError
    );
  });

  it('Verify cancel button', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    Cart.addToCart(products[0].name);
    Cart.navigateToCart();
    cy.get(Cart.checkOutBtn).click();
    cy.url().should('contain', routesData.checkout_step_one);

    cy.get(CheckoutInfo.cancelButton).click();
    cy.url().should('contain', routesData.cart);
  });

  it('Verify successful form entry', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    Cart.addToCart(products[0].name);
    Cart.navigateToCart();
    Cart.checkoutCart();

    CheckoutInfo.fillCheckoutForm();
    cy.url().should('contain', routesData.checkout_step_two);
  });
});

describe('Checkout Overview', () => {
  beforeEach(() => {
    cy.visit('/');
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    Cart.addToCart(products[0].name);
    Cart.addToCart(products[1].name);
    Cart.navigateToCart();
    Cart.checkoutCart();
    CheckoutInfo.fillCheckoutForm();
  });

  it('Verify data on page', () => {
    cy.get(CheckoutOverview.itemName).each(($el, index) => {
      let text = $el.text();
      expect(text).to.equal(products[index].name);
    });
    cy.get(CheckoutOverview.itemPrice).each(($el, index) => {
      let price = $el.text();
      expect(price).to.equal(`$${products[index].price}`);
    });
  });

  it('Verify subtotal', () => {
    let sum = 0.0;
    cy.get(CheckoutOverview.subTotal)
      .invoke('text')
      .then((text1) => {
        cy.log(text1);
        let subTotal = parseFloat(text1.split('$')[1]);
        cy.get(CheckoutOverview.itemPrice)
          .each(($el) => {
            let price = parseFloat($el.text().replace('$', ''));
            sum += price;
          })
          .then(() => {
            expect(subTotal).to.equal(sum);
          });
      });
  });

  it('Verify total', () => {
    cy.get(CheckoutOverview.subTotal)
      .invoke('text')
      .then((text1) => {
        let subTotal = parseFloat(text1.split('$')[1]);
        cy.get(CheckoutOverview.summaryTax)
          .invoke('text')
          .then((text2) => {
            let tax = parseFloat(text2.split('$')[1]);
            cy.get(CheckoutOverview.total)
              .invoke('text')
              .then((text3) => {
                let grandTotal = parseFloat(text3.split('$')[1]);
                let realTotal = tax + subTotal;
                expect(realTotal).to.equal(grandTotal);
              });
          });
      });
  });
});

describe('Checkout Complete', () => {
  beforeEach(() => {
    cy.visit('/');
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    Cart.addToCart(products[0].name);
    Cart.addToCart(products[1].name);
    Cart.navigateToCart();
    Cart.checkoutCart();
    CheckoutInfo.fillCheckoutForm();
    cy.get(CheckoutOverview.finishButton).click();
  });

  it('Verify checkout complete page', () => {
    cy.get(CheckoutComplete.orderText).should('be.visible');
    cy.get(CheckoutComplete.orderHeader).should('be.visible');
    cy.get(CheckoutComplete.pageTitle).should('be.visible');
    cy.get(CheckoutComplete.ponyLogo).should('be.visible');
  });

  it('Verify back button', () => {
    cy.get(CheckoutComplete.backButton).click();
    cy.url().should('contain', routesData.product);
  });
});
