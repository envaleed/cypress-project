class CheckoutOverview {
  get itemName() {
    return '.inventory_item_name';
  }
  get itemPrice() {
    return '.inventory_item_price';
  }

  get cartQuantity() {
    return '.cart_quantity';
  }

  get subTotal() {
    return '.summary_subtotal_label';
  }
  get summaryTax() {
    return '.summary_tax_label';
  }
  get total() {
    return '.summary_total_label';
  }

  get cancelButton() {
    return '[data-test="cancel"]';
  }

  get finishButton() {
    return '[data-test="finish"]';
  }
}
export default new CheckoutOverview();
