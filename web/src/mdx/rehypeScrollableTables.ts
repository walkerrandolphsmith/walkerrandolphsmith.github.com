import type { Element, Root } from 'hast'

/**
 * Wrap each table in a region that scrolls horizontally, so wide tables stay
 * readable on narrow screens instead of being clipped. The region is
 * focusable, so keyboard users can scroll it too.
 */
export default function rehypeScrollableTables() {
  return (tree: Root) => {
    const visit = (node: Root | Element) => {
      node.children.forEach((child, index) => {
        if (child.type !== 'element') return
        if (child.tagName === 'table') {
          node.children[index] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll'],
              tabIndex: 0,
              role: 'region',
              ariaLabel: 'Table, scrolls horizontally',
            },
            children: [child],
          }
          return
        }
        visit(child)
      })
    }
    visit(tree)
  }
}
