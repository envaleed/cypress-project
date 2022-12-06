class CheckoutComplete {
  get pageTitle() {
    return '.title';
  }
  get orderText() {
    return '.complete-text';
  }

  get orderHeader() {
    return '.complete-header';
  }
  get ponyLogo() {
    return '.pony_express';
  }
  get backButton() {
    return '[data-test="back-to-products"]';
  }

  fillCheckoutForm() {
    cy.get(this.backButton).click();
  }
}
export default new CheckoutComplete();
