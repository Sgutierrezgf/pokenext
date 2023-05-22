describe("Authentication Tests", () => {
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
    // cy.contains(".logintext", "User Profile");
  });

  it("should display an error message for invalid login", () => {
    cy.get('input[name="email').type("turin2@turin.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Invalid credentials!");
  });

  it("should register a new user successfully", () => {
    cy.get('button.login2').click();

    cy.get('input[name="name"]').type(`${crypto.randomUUID()}`);
    cy.get('input[name="email').type(`${crypto.randomUUID()}@gmail.com`);
    cy.get('input[name="password"]').type(`${crypto.randomUUID()}`);
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the "/pokemons" page
    cy.url().should("include", "/pokemons");

    // Assert that the user's profile is displayed
    // cy.contains(".logintext", "User Profile");
  });

  it("should display an error message for invalid registration", () => {
    cy.get('button.login2').click();

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("existinguser@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Something went wrong!");
  });
});