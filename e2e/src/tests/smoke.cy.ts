it("displays the hero text and call to action", () => {
  cy.visit("/");
  cy.contains("Walker Smith").should("be.visible");
  cy.get('[data-test="hero-primary-cta"]');
  cy.get('[data-test="hero-secondary-cta"]');
});
