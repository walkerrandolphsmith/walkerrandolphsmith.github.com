// Tag catalog, tag pages, reading time, related posts, and social cards.
// search.json is the generated search index. Each test checks the pages
// against it, so the tests follow the posts as they change.

type IndexedPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

// The same slug that github-slugger gives the tags in tag-data.json.
const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");

const postIndex = () =>
  cy.request("/search.json").its("body") as Cypress.Chainable<IndexedPost[]>;

it("lists every tag with its post count on the topics page", () => {
  postIndex().then((posts) => {
    const counts = new Map<string, number>();
    posts.forEach((post) =>
      new Set(post.tags.map(tagSlug)).forEach((slug) =>
        counts.set(slug, (counts.get(slug) ?? 0) + 1),
      ),
    );
    cy.visit("/tags/");
    cy.get('[data-test="tag-catalog-link"]').should("have.length", counts.size);
    counts.forEach((count, slug) => {
      cy.get(`[data-test="tag-catalog-link"][href="/tags/${slug}/"]`).should(
        "contain.text",
        `${count} ${count === 1 ? "post" : "posts"}`,
      );
    });
  });
});

it("links to the topics from the blog index", () => {
  cy.visit("/blog/");
  cy.get('[data-test="all-topics"]').click();
  cy.location("pathname").should("eq", "/tags/");
});

it("lists only the posts with the tag on a tag page", () => {
  postIndex().then((posts) => {
    const tag = posts[0].tags[0];
    const tagged = posts.filter((post) =>
      post.tags.some((other) => tagSlug(other) === tagSlug(tag)),
    );
    cy.visit(`/tags/${tagSlug(tag)}/`);
    cy.get("h1").should("contain.text", "Posts about");
    cy.get('[data-test="tag-posts"] article').should(
      "have.length",
      tagged.length,
    );
    tagged.forEach((post) => {
      cy.get(`[data-test="tag-posts"] a[href^="/blog/${post.slug}"]`).should(
        "exist",
      );
    });
  });
});

it("shows the reader label, not the slug, on a tag page", () => {
  cy.visit("/tags/ci-cd/");
  cy.get("h1").should("have.text", "Posts about CI/CD");
  cy.title().should("contain", "Posts about CI/CD");
});

it("links each tag in a post header to its tag page", () => {
  postIndex().then((posts) => {
    const post = posts[0];
    cy.visit(`/blog/${post.slug}/`);
    cy.get('header [data-test="tag-link"]')
      .first()
      .should("have.attr", "href", `/tags/${tagSlug(post.tags[0])}/`)
      .click();
    cy.location("pathname").should("eq", `/tags/${tagSlug(post.tags[0])}/`);
  });
});

it("shows the reading time on post cards and post headers", () => {
  cy.visit("/blog/");
  cy.get('article [data-test="reading-time"]')
    .first()
    .invoke("text")
    .should("match", /^\d+ min read$/);
  postIndex().then((posts) => {
    cy.visit(`/blog/${posts[0].slug}/`);
    cy.get('header [data-test="reading-time"]')
      .invoke("text")
      .should("match", /^\d+ min read$/);
  });
});

it("shows two or three related posts that share a tag", () => {
  postIndex().then((posts) => {
    const post = posts.find((candidate) =>
      posts.some(
        (other) =>
          other.slug !== candidate.slug &&
          other.tags.some((tag) => candidate.tags.includes(tag)),
      ),
    )!;
    cy.visit(`/blog/${post.slug}/`);
    cy.get('[data-test="related-post-link"]')
      .should("have.length.within", 2, 3)
      .each(($link) => {
        const href = $link.attr("href") ?? "";
        expect(href).not.to.contain(`/blog/${post.slug}`);
      })
      .first()
      .then(($link) => {
        const related = posts.find((other) =>
          ($link.attr("href") ?? "").includes(`/blog/${other.slug}`),
        )!;
        const shared = related.tags.filter((tag) =>
          post.tags.map(tagSlug).includes(tagSlug(tag)),
        );
        expect(shared, "tags shared with the first related post").not.to.be
          .empty;
      });
  });
});

it("gives each post its own social card", () => {
  postIndex().then((posts) => {
    const post = posts[0];
    cy.visit(`/blog/${post.slug}/`);
    cy.get('meta[property="og:image"]')
      .should("have.attr", "content")
      .and("match", new RegExp(`/social/${post.slug}\\.png$`));
    cy.get('meta[property="og:image:width"]').should(
      "have.attr",
      "content",
      "1200",
    );
    cy.get('meta[name="twitter:image"]')
      .should("have.attr", "content")
      .and("match", new RegExp(`/social/${post.slug}\\.png$`));
    cy.request(`/social/${post.slug}.png`)
      .its("headers")
      .its("content-type")
      .should("contain", "image/png");
  });
});
