describe("Header Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should log in successfully", () => {
    cy.get('input[name="email').type("turin@turin.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the "/pokemons" page
    cy.url().should("include", "/pokemons");

    // Assert that the user's profile is displayed
    cy.contains('span[id="name"]', "turin");

    // cy.get("img[alt='Your Company']").should("be.visible");
  });


  it("See logo successfully", () => {
    cy.get('input[name="email').type("turin@turin.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the "/pokemons" page
    cy.url().should("include", "/pokemons");

    // Assert that the user's profile is displayed
    cy.get("img[alt='Your Company']").should("be.visible");

    // cy.get("img[alt='Your Company']").should("be.visible");
  });

  it("should open the user menu", () => {
    cy.get('input[name="email').type("turin@turin.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the "/pokemons" page
    cy.url().should("include", "/pokemons");

    cy.get("Button[id='menu']").click();

  //   // Assert that the user menu is open
    cy.get("div[id='items']").should("be.visible");
  });

});