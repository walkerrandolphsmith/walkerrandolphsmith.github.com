'use client'
import { Children, useLayoutEffect, useRef, useState } from 'react'

const twoColumnQuery = '(min-width: 768px)'
// Matches md:gap-y-12 between cards in a column.
const cardGap = 48

// Masonry in rank order: each card, taken in rank order, goes into the shorter
// of two columns, and keeps its natural height. The server render alternates
// columns, and the client rebalances once it can measure the cards. On one
// column, display: contents on the column wrappers lets the order style keep
// strict rank order.
const TestimonialGrid = ({ children }) => {
  const cards = Children.toArray(children)
  const [columns, setColumns] = useState<number[]>(() =>
    cards.map((_, index) => index % 2),
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const balance = () => {
      if (!window.matchMedia(twoColumnQuery).matches) return
      const totals = [0, 0]
      const next = cardRefs.current.map(card => {
        const column = totals[1] < totals[0] ? 1 : 0
        totals[column] += (card?.offsetHeight ?? 0) + cardGap
        return column
      })
      setColumns(current =>
        current.length === next.length &&
        current.every((column, index) => column === next[index])
          ? current
          : next,
      )
    }

    balance()
    const observer = new ResizeObserver(balance)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [cards.length])

  const column = (target: number) => (
    <div className="contents md:flex md:flex-1 md:min-w-0 md:flex-col md:gap-y-12">
      {cards.map((card, index) =>
        columns[index] === target ? (
          <div
            key={index}
            style={{ order: index }}
            ref={element => {
              cardRefs.current[index] = element
            }}
          >
            {card}
          </div>
        ) : null,
      )}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-y-12 md:flex-row md:items-start md:gap-x-8 mb-12"
    >
      {column(0)}
      {column(1)}
    </div>
  )
}

export default TestimonialGrid
