it("should serve a favicon", () => {
  cy.visit("/");
  cy.document().then((doc) => {
    const faviconElement = doc.querySelector(
      "link[rel='icon'][href='/favicon.ico']"
    );

    expect(faviconElement).to.exist;
  });
  cy.request("/favicon.ico");
});

it("should serve a sitemap", () => {
  cy.request("/sitemap.xml");
});

it("should serve a robots.txt", () => {
  cy.request("/robots.txt");
});
