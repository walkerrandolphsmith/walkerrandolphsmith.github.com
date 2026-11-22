// A post's frontmatter date is a calendar day, such as 2026-11-22. Parsed into
// a Date it becomes midnight UTC on that day. Formatting it in the local time
// zone shows the previous day anywhere west of UTC, and the server render
// (built in UTC) then differs from the browser render, which breaks
// hydration. Formatting in UTC shows the frontmatter day everywhere.
export const formatPostDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
