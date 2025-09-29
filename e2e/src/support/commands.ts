Cypress.Commands.add("visitRouteWithJavaScriptDisabled", (route: string) => {
  cy.request(route)
    .its("body")
    .then((html) => {
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      cy.document().invoke({ log: false }, "write", html);
    });
});
