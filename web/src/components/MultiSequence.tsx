'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TypeAnimation } from 'react-type-animation'

import tabs from '@/tokenized-tabs'

import { useTab } from './CodeTabContext'

type Sequence = string | (() => void)

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor-visible'
const cursorClasses = [
  'custom-type-animation-cursor',
  'before:opacity-0 relative after:content-[|] before:right-[3px] before:bottom-[-23px] before:absolute before:translate-x-full before:text-white  before:flex before:items-center before:justify-center before:rounded-3xl before:text-sm',
  'text-sm font-mono whitespace-pre max-h-[25px] min-h-[25px] align-[super]',
].join(' ')

const Token = ({ token, speed, onTokenCompleted, awaitNextKeyStroke }) => {
  const ref = useRef<HTMLElement>()

  const addCursor = () => {
    ref.current.classList.add(CURSOR_CLASS_NAME)
  }
  const removeCursor = () => {
    ref.current.classList.remove(CURSOR_CLASS_NAME)
  }

  useEffect(() => {
    addCursor()
  }, [])

  return (
    <TypeAnimation
      wrapper="span"
      ref={ref}
      className={`${cursorClasses}`}
      style={{
        lineHeight: '1.5em',
        color: token?.s?.color,
      }}
      cursor
      sequence={
        [
          token.c,
          () => {
            if (!awaitNextKeyStroke) {
              removeCursor()
            }
            onTokenCompleted()
          },
        ] as Sequence[]
      }
      speed={speed ?? 60}
    />
  )
}

const Row = ({ events, speed, onRowCompleted, isLastRow }) => {
  const [activeToken, setActiveToken] = useState(0)

  const processNextToken = () => {
    setActiveToken(activeToken + 1)
  }

  const flatEvents = events.flatMap(
    event =>
      typeof event === 'number' || typeof event === 'string'
        ? [{ c: event, s: { color: undefined } }]
        : event, // assumes this is already an array of tokens
  )

  return (
    <span
      className="block leading-[24px] font-mono min-h-[25px] max-h-[25px] pl-2"
      style={{ borderBottom: '1px solid transparent' }}
    >
      {flatEvents.map((token, index) => {
        const isLastToken = index === flatEvents.length - 1
        const handleTokenCompleted = isLastToken
          ? onRowCompleted
          : processNextToken

        return index > activeToken ? null : (
          <Token
            key={index}
            token={token}
            speed={speed}
            onTokenCompleted={handleTokenCompleted}
            awaitNextKeyStroke={isLastRow && isLastToken}
          />
        )
      })}
    </span>
  )
}

const Rows = ({ rows }) => {
  const [activeRow, setActiveRow] = useState(0)

  const handleRowCompleted = () => {
    setActiveRow(activeRow + 1)
  }

  return (
    <>
      {rows.map((row, rowIndex) =>
        rowIndex > activeRow ? null : (
          <Row
            key={rowIndex}
            events={row.l}
            speed={row.s}
            onRowCompleted={handleRowCompleted}
            isLastRow={rows.length - 1 === rowIndex}
          />
        ),
      )}
    </>
  )
}

const MultiSequence = () => {
  const heroRef = useRef()
  const { ref, inView } = useInView()
  const setRef = useCallback(
    node => {
      heroRef.current = node
      ref(node)
    },
    [ref],
  )
  const { selectedTab } = useTab()
  const rows = tabs[selectedTab].seq

  return (
    <div className="flex-1 overflow-hidden truncate" ref={setRef}>
      {inView &&
        Object.values(tabs).map(tab =>
          tab.id === selectedTab ? <Rows key={tab.id} rows={rows} /> : null,
        )}
    </div>
  )
}

export default MultiSequence
