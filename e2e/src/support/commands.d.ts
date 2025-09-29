declare namespace Cypress {
  interface Chainable<Subject = any> {
    visitRouteWithJavaScriptDisabled(route: string): Chainable<Subject>;
  }
}
