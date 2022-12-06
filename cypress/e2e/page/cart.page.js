import routesData from '../data/routes.data';

class Cart {
  get cartIcon() {
    return '.shopping_cart_link';
  }
  get cartNotification() {
    return '.shopping_cart_badge';
  }

  get cartItems() {
    return '.cart_item';
  }
  get cartItemsName() {
    return '.inventory_item_name';
  }
  get cartQuantity() {
    return '.cart_quantity';
  }

  get addToCartBtns() {
    return '//button[text()="Add to cart"]';
  }

  get removeItemBtns() {
    return '//button[text()="Remove"]';
  }

  get removeSauceLabBackPackBtn() {
    return '#remove-sauce-labs-backpack';
  }
  get removedCartItem() {
    return '.removed_cart_item';
  }

  get checkOutBtn() {
    return '#checkout';
  }

  addToCart(itemName) {
    let addToCartBtn = `#add-to-cart-${this.applySelectorFormat(itemName)}`;

    cy.get(addToCartBtn).should('be.visible');
    cy.get(addToCartBtn).click();
  }

  removeFromCart(itemName) {
    let removeFromCartBtn = `#remove-${this.applySelectorFormat(itemName)}`;

    cy.get(removeFromCartBtn).should('be.visible');
    cy.get(removeFromCartBtn).click();
  }

  checkoutCart() {
    cy.get(this.checkOutBtn).click();
    cy.url().should('contain', routesData.checkout_step_one);
  }

  navigateToCart() {
    cy.get(this.cartIcon).click();
  }

  applySelectorFormat(itemName) {
    return itemName.toLowerCase().replaceAll(' ', '-');
  }
}
export default new Cart();
