// Files and markup that let search engines and AI agents describe the site.

const jsonLdTypes = (doc: Document) =>
  Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent || "{}"))
    .flatMap((data) => data["@graph"] || [data])
    .map((node) => node["@type"]);

it("should serve llms.txt with the site name and articles", () => {
  cy.request("/llms.txt").then(({ body }) => {
    expect(body).to.match(/^# Walker Smith\n/);
    expect(body).to.contain("## Articles");
    expect(body).to.contain("/blog/");
  });
});

it("should serve llms-full.txt with the resume and recommendations", () => {
  cy.request("/llms-full.txt").then(({ body }) => {
    expect(body).to.contain("## Resume");
    expect(body).to.contain("## Recommendations");
    expect(body).to.contain("## Article: ");
  });
});

it("should serve agents.txt at the root and the well-known path", () => {
  ["/agents.txt", "/.well-known/agents.txt"].forEach((path) => {
    cy.request(path).then(({ body }) => {
      expect(body).to.contain("Spec-Version: 1.0");
      expect(body).to.contain("Capability: site-data");
    });
  });
});

it("should serve an RSS feed", () => {
  cy.request("/feed.xml").then(({ body }) => {
    expect(body).to.contain("<rss");
    expect(body).to.contain("<item>");
  });
});

it("should serve the site data that the WebMCP tools read", () => {
  cy.request("/site-data.json").then(({ body }) => {
    expect(body.posts).to.have.length.greaterThan(0);
    expect(body.recommendations).to.have.length(4);
    expect(body.experience.jobs).to.have.length.greaterThan(0);
    // Contact details stay off the agent files: no phone number or email.
    const text = JSON.stringify(body);
    expect(text).not.to.match(/\d{3}[-. ]\d{3}[-. ]\d{4}/);
    expect(text).not.to.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  });
});

it("should describe the person and the site on the homepage", () => {
  cy.visit("/");
  cy.get('link[rel="canonical"]').should("have.length", 1);
  cy.document().then((doc) => {
    expect(jsonLdTypes(doc)).to.include.members(["Person", "WebSite"]);
  });
});

it("should describe each article as a BlogPosting", () => {
  cy.request("/site-data.json").then(({ body }) => {
    const post = body.posts[0];
    cy.visit(`/blog/${post.slug}/`);
    cy.get('link[rel="canonical"]')
      .should("have.length", 1)
      .and("have.attr", "href", post.url);
    cy.document().then((doc) => {
      expect(jsonLdTypes(doc)).to.include.members([
        "BlogPosting",
        "BreadcrumbList",
      ]);
    });
  });
});

it("should not fetch tool data until an agent calls a tool", () => {
  cy.visit("/");
  cy.window().then((win) => {
    const requests = win.performance
      .getEntriesByType("resource")
      .map((entry) => entry.name);
    expect(requests.some((name) => name.includes("site-data.json"))).to.equal(
      false
    );
  });
});
