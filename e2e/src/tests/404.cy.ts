it("should serve a friendly 404 page", () => {
  cy.visit("/this-url-will-never-be-valid", { failOnStatusCode: false });
  cy.contains("Page Not Found");
});
