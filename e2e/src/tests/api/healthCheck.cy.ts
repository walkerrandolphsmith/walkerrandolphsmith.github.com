it.skip("should return the slot name", () => {
  cy.request("/api/healthCheck")
    .its("body")
    .then((body) => {
      expect(body).to.have.property("configurationHealthCheck", "healthCheck");
    });
  cy.api({ url: "/api/healthCheck" });
});
