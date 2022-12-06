class CheckoutInfo {
  get firstName() {
    return '[data-test="firstName"]';
  }
  get lastName() {
    return '[data-test="lastName"]';
  }

  get postalCode() {
    return '[data-test="postalCode"]';
  }
  get continueButton() {
    return '[data-test="continue"]';
  }
  get cancelButton() {
    return '[data-test="cancel"]';
  }

  get errorMessage() {
    return '[data-test="error"]';
  }

  fillCheckoutForm() {
    cy.get(this.firstName).type('Mark');
    cy.get(this.lastName).type('Jones');
    cy.get(this.postalCode).type('11010');
    cy.get(this.continueButton).click();
  }
}
export default new CheckoutInfo();
