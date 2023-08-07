// test.spec.js
describe("Shopping Cart", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add items to the cart", () => {
    cy.get("ul#product-list").children("li").first().children("button").click();
    cy.get("ul#cart-list").should("contain", "Product 1 - $10 x 1");
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "cartData")
      .should("eq", JSON.stringify([{ id: 1, quantity: 1 }]));
  });

  it("should remove items from the cart", () => {
    cy.get("ul#product-list").children("li").first().children("button").click();
    cy.get("ul#product-list").children("li").eq(4).children("button").click();
    cy.get("ul#cart-list").should("have.length", 2);
    cy.get("ul#cart-list").eq(0).should("contain", "Product 1 - $10 x 1");
    cy.get("ul#cart-list").eq(1).should("contain", "Product 5 - $50 x 1");
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "cartData")
      .should("eq", JSON.stringify([{ id: 1, quantity: 1 }, { id: 5, quantity: 1 }]));
  });

  it("should clear the cart", () => {
    cy.get("ul#product-list").children("li").first().children("button").click();
    cy.get("ul#product-list").children("li").eq(4).children("button").click();
    cy.get("button#clear-cart-btn").click();
    cy.get("ul#cart-list").should("not.exist");
    cy.window().its("sessionStorage").should("not.have.property", "cartData");
  });
});
