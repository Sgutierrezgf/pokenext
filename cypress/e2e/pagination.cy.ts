describe("Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should pagination is successfully", () => {
    cy.get('input[name="email').type("turin@turin.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the "/pokemons" page
    cy.url().should("include", "/pokemons");

    it("should navigate to the previous page when clicking the left arrow button", () => {
      // Assuming the current page is 2
      cy.get("button[aria-label='Previous Page']").click();
  
      // Assert that the page is now 1
      cy.contains("button", "1").should("have.class", "bg-primary text-white");
    });
  
    it("should navigate to the next page when clicking the right arrow button", () => {
      // Assuming the current page is 1
      cy.get("button[aria-label='Next Page']").click();
  
      // Assert that the page is now 2
      cy.contains("button", "2").should("have.class", "bg-primary text-white");
    });
  
    it("should navigate to a specific page when clicking on a page button", () => {
      // Assuming the current page is 1
      cy.contains("button", "3").click();
  
      // Assert that the page is now 3
      cy.contains("button", "3").should("have.class", "bg-primary text-white");
    });
  
    it("should disable the previous button on the first page", () => {
      // Assuming the current page is 1
      cy.contains("button[aria-label='Previous Page']").should(
        "have.attr",
        "disabled"
      );
    });
  
    it("should disable the next button on the last page", () => {
      // Assuming the current page is the last page
      cy.contains("button[aria-label='Next Page']").should("have.attr", "disabled");
    });
  });

});