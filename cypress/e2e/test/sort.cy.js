/// <reference types="cypress" />
import Auth from '../page/auth.page';
import productData from '../data/product.data';
import Product from '../page/product.page';
import loginData from '../data/login.data';

describe('Sort', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should sort product list from A-Z', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    cy.get(Product.selectSortDropDown).select(productData.sort['A to Z']);

    let productList = productData.products;
    productList.sort(function (a, b) {
      const productA = a.name.toUpperCase();
      const productB = b.name.toUpperCase();
      if (productA > productB) {
        return 1;
      }
      if (productA < productB) {
        return -1;
      }
      return 0;
    });

    cy.get(Product.itemsName).each(($elem, index) => {
      expect($elem.text()).equal(productList[index].name);
    });
  });

  it('should sort product list from Z-A', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    cy.get(Product.selectSortDropDown).select(productData.sort['Z to A']);

    let productList = productData.products;
    productList
      .sort(function (a, b) {
        const productA = a.name.toUpperCase();
        const productB = b.name.toUpperCase();
        if (productA > productB) {
          return 1;
        }
        if (productA < productB) {
          return -1;
        }
        return 0;
      })
      .reverse();

    cy.get(Product.itemsName).each(($elem, index) => {
      expect($elem.text()).equal(productList[index].name);
    });
  });

  it('should sort product list from Low to High', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    cy.get(Product.selectSortDropDown).select(productData.sort['Low to High']);

    let productList = productData.products;
    productList.sort((a, b) => a.price - b.price);

    cy.get(Product.itemsPrice).each(($elem, index) => {
      expect(parseFloat($elem.text().replace('$', ''))).equal(
        productList[index].price
      );
    });
  });

  it('should sort product list from high to low', () => {
    Auth.login(loginData.validUser.username, loginData.validUser.password);
    cy.get(Product.selectSortDropDown).select(productData.sort['High to Low']);

    let productList = productData.products;
    productList.sort((a, b) => b.price - a.price);

    cy.get(Product.itemsPrice).each(($elem, index) => {
      expect(parseFloat($elem.text().replace('$', ''))).equal(
        productList[index].price
      );
    });
  });
});
