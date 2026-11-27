// The command palette: free-text article search and each command.

const input = () => cy.get('[data-test="palette-input"]');
const options = () => cy.get('[data-test="palette-option"]');

const openPalette = () => {
  cy.visit("/blog/");
  cy.get('[data-test="palette-trigger"]').click();
  cy.get('[data-test="command-palette"]').should("have.attr", "open");
  input().should("be.focused");
};

const pressTab = () =>
  input().trigger("keydown", { key: "Tab", code: "Tab", keyCode: 9 });

it("opens with Ctrl+K and closes with Escape", () => {
  cy.visit("/blog/");
  cy.get('[data-test="palette-trigger"]').should("be.visible");
  cy.get("body").type("{ctrl}k");
  cy.get('[data-test="command-palette"]').should("have.attr", "open");
  input().should("be.focused").type("{esc}");
  cy.get('[data-test="command-palette"]').should("not.have.attr", "open");
});

it("lists the commands and the help entry before any text", () => {
  openPalette();
  cy.contains('[role="group"]', "Commands").within(() => {
    [
      "Go to",
      "Search articles",
      "Search by tag",
      "Download resume",
      "Social info",
    ].forEach((title) => cy.contains('[role="option"]', title));
  });
  cy.contains('[role="group"]', "Suggestions").contains(
    '[role="option"]',
    "Help",
  );
  input().should("have.attr", "aria-activedescendant").and("not.be.empty");
});

it("finds articles from free text and opens the selected one", () => {
  cy.request("/search.json").then(({ body }) => {
    const post = body[0];
    openPalette();
    input().type(post.title);
    cy.contains('[role="group"]', "Articles")
      .find('[role="option"]')
      .first()
      .should("contain.text", post.title);
    input().type("{enter}");
    cy.location("pathname").should("eq", `/blog/${post.slug}/`);
  });
});

it("shows the details of an article with Tab, and goes back with Escape", () => {
  cy.request("/search.json").then(({ body }) => {
    const post = body[0];
    openPalette();
    input().type(post.title);
    options().first().should("contain.text", post.title);
    pressTab();
    cy.get('[data-test="palette-chip"]').should("contain.text", "Article");
    cy.get('[data-test="palette-panel"]').should("contain.text", post.title);
    options().first().should("contain.text", "Open article");
    input().type("{esc}");
    cy.get('[data-test="palette-chip"]').should("not.exist");
    input().should("have.value", post.title);
  });
});

it("searches by tag, then lists the posts with the chosen tag", () => {
  openPalette();
  input().type("#");
  cy.get('[data-test="palette-chip"]').should("contain.text", "Tag");
  input().type("secur");
  options().first().should("contain.text", "security").click();
  cy.get('[data-test="palette-chip"]').should("contain.text", "Tag › security");
  cy.contains('[role="group"]', "Posts about security")
    .find('[role="option"]')
    .should("have.length.greaterThan", 0);
  input().type("{backspace}");
  cy.get('[data-test="palette-chip"]').should("have.text", "Tag");
});

it("downloads the resume", () => {
  cy.intercept("GET", "/Walker_Smith_Resume.pdf").as("resume");
  openPalette();
  input().type("resume");
  cy.contains('[role="option"]', "Download resume").click();
  cy.wait("@resume");
  cy.get('[data-test="command-palette"]').should("not.have.attr", "open");
});

it("shows the social info as a panel, not a flat list", () => {
  openPalette();
  input().type("social{enter}");
  cy.get('[data-test="palette-chip"]').should("contain.text", "Social info");
  cy.get('[data-test="palette-social-panel"]').within(() => {
    cy.contains("h2", "Walker Smith");
    cy.get('a[href="https://www.linkedin.com/in/walkerrandolphsmith"]');
    cy.get('a[href="https://github.com/walkerrandolphsmith"]');
    cy.contains("Ways to reach out");
  });
  cy.contains('[role="group"]', "Profiles");
  cy.contains('[role="group"]', "Reach out");
});

it("goes to a page", () => {
  openPalette();
  input().type(">");
  cy.get('[data-test="palette-chip"]').should("contain.text", "Go to");
  input().type("topics{enter}");
  cy.location("pathname").should("eq", "/tags/");
});
