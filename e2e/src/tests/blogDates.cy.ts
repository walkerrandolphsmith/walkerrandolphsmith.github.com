// Each post's frontmatter date is a calendar day. The blog index must show
// that same day in any time zone. The ci:test script runs the browser in
// America/Los_Angeles, where a date formatted in local time shows one day
// early (2026-11-22 becomes November 21, 2026).
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// search.json is the generated search index. Its date field is the
// frontmatter day as an ISO timestamp at midnight UTC.
const expectedLabel = (isoDate: string) => {
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  return `${monthNames[month - 1]} ${day}, ${year}`;
};

it("shows each post's frontmatter date on the blog index", () => {
  cy.request("/search.json").then(({ body }) => {
    const posts: { title: string; slug: string; date: string }[] = body;
    cy.visit("/blog/");
    // Read the dates only after React hydrates the list. The browser's render
    // is the one that differs by time zone, and before hydration the page
    // still shows the server's text.
    cy.get("article time").should(($times) => {
      expect($times.length).to.be.gte(1);
      const keys = Object.keys($times[0]);
      expect(keys.some((key) => key.startsWith("__reactFiber"))).to.equal(true);
    });
    cy.get("article").each(($article) => {
      const href = $article.find("h2 a").attr("href") ?? "";
      const post = posts.find((p) => href.replace(/\/$/, "").endsWith(`/blog/${p.slug}`));
      expect(post, `search.json entry for ${href}`).to.exist;
      expect($article.find("time").text()).to.equal(expectedLabel(post!.date));
    });
  });
});
