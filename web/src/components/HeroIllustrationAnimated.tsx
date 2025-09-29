'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  A1,
  A2,
  A4,
  A5,
  A6,
  B1,
  B3,
  B5,
  B6,
  C1,
  C6,
  Centroid,
  D1,
  D2,
  D4,
  D5,
  E1,
  E3,
  E4,
  E5,
  E6,
  F1,
  F3,
  F4,
  F6,
} from '@/components/Icons'

import GridTile from './GridTile'

const MemoizedIconTile = ({
  Icon,
  hasEmphasis,
  fill = undefined,
  darkFill = undefined,
}) =>
  useMemo(() => {
    const fillValue = `fill-[${fill}]`
    const darkFillValue = `dark:fill-[${darkFill}]`
    return (
      <Icon
        className={`custom-grid-tile-icon transition-transform  ${fill ? fillValue : ''} ${darkFill ? darkFillValue : ''} ${
          hasEmphasis ? 'duration-1000 ease-out' : 'duration-200 ease-in'
        }`}
      />
    )
  }, [Icon, hasEmphasis, fill, darkFill])

const connections = [
  { from: 'A2', to: 'C3' },
  { from: 'C3', to: 'C6' },
  { from: 'A4', to: 'C3' },
  { from: 'C3', to: 'D2' },
  { from: 'C3', to: 'E3' },
]

const TICK = 80

function getElementCenter(el) {
  const rect = el.getBoundingClientRect()
  const container = document.getElementById('custom-grid')
  const containerRect = container.getBoundingClientRect()

  return {
    x: rect.left + rect.width / 2 - containerRect.left,
    y: rect.top + rect.height / 2 - containerRect.top,
  }
}

function getSmoothBendPath(start, end, tileSize) {
  const dx = end.x - start.x
  const dy = end.y - start.y

  // If points are too close, just draw a straight line
  if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
    return `M${start.x},${start.y} L${end.x},${end.y}`
  }

  // Determine bend radius based on half of the tile size to ensure it stays within the tile
  const bendRadius = tileSize * 0.4 // Using 0.4 to give some padding within the tile

  // Calculate how many tile-widths apart they are
  const tilesAwayX = Math.round(Math.abs(dx) / tileSize)
  const tilesAwayY = Math.round(Math.abs(dy) / tileSize)

  // If they're in the same row or column, draw a straight line
  if (tilesAwayX === 0 || tilesAwayY === 0) {
    return `M${start.x},${start.y} L${end.x},${end.y}`
  }

  let path = `M${start.x},${start.y}`

  // Determine the direction of the bend
  const xDir = dx > 0 ? 1 : -1
  const yDir = dy > 0 ? 1 : -1

  // Choose the first direction based on which axis has a larger distance
  // This helps in creating more natural looking bends for diagonal connections
  const goHorizontalFirst = Math.abs(dx) > Math.abs(dy)

  if (goHorizontalFirst) {
    // Go horizontal first
    const cornerX = start.x + dx - xDir * bendRadius
    const cornerY = start.y

    path += ` L${cornerX},${cornerY}`
    path += ` Q${start.x + dx},${start.y} ${start.x + dx},${start.y + yDir * bendRadius}`
    path += ` L${end.x},${end.y}`
  } else {
    // Go vertical first
    const cornerX = start.x
    const cornerY = start.y + dy - yDir * bendRadius

    path += ` L${cornerX},${cornerY}`
    path += ` Q${start.x},${start.y + dy} ${start.x + xDir * bendRadius},${start.y + dy}`
    path += ` L${end.x},${end.y}`
  }

  return path.trim()
}

function ConnectionLines({
  currentEmphasisIndex,
  connections,
  onAnimationDurationChange,
}) {
  const svgRef = useRef(null)
  const pathRefs = useRef([])
  const [{ width, height }, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  const drawConnections = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    Array.from(svg.children).forEach(child => {
      if (child['tagName'] === 'path') {
        svg.removeChild(child)
      }
    })
    pathRefs.current = []

    const customGrid = document.getElementById('custom-grid')

    if (customGrid) {
      setDimensions({
        width: customGrid.offsetWidth,
        height: customGrid.offsetHeight,
      })
    }

    connections.forEach(({ from, to }, index) => {
      const fromEl = document.getElementById(from)
      const toEl = document.getElementById(to)

      if (!fromEl || !toEl) return

      const start = getElementCenter(fromEl)
      const end = getElementCenter(toEl)

      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      )

      const d = getSmoothBendPath(
        start,
        end,
        fromEl.getBoundingClientRect().width,
      )

      path.setAttribute('d', d)
      path.setAttribute('stroke-width', '2')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke-linecap', 'butt')
      path.setAttribute('stroke-linejoin', 'butt')

      pathRefs.current[index] = path

      svg.appendChild(path)

      const dx = end.x - start.x
      const dy = end.y - start.y
      let gradientId = 'blue-gradient'
      const tolerance = 5

      if (Math.abs(dx) < tolerance) {
        // Primarily vertical
        gradientId = 'vertical-gradient'
      } else if (Math.abs(dy) < tolerance) {
        // Primarily horizontal
        gradientId = 'horizontal-gradient'
      }
      path.setAttribute('stroke', `url(#${gradientId})`)
      requestAnimationFrame(() => {
        const pathLength = path.getTotalLength()
        path.style.setProperty('--path-length', `${pathLength}px`)
        const calculatedDurationMs = (pathLength / TICK) * 1000
        path.style.setProperty(
          '--animation-duration',
          `${calculatedDurationMs}ms`,
        )

        path.style.strokeDasharray = `${pathLength} ${pathLength}`
        // Initially position the dash completely off-screen at the start
        path.style.strokeDashoffset = `${pathLength}`
      })
    })
  }, [connections])

  useEffect(() => {
    drawConnections()

    // Redraw on resize
    window.addEventListener('resize', drawConnections)
    return () => window.removeEventListener('resize', drawConnections)
  }, [drawConnections])

  useEffect(() => {
    // First, reset animation and hide all paths
    pathRefs.current.forEach(path => {
      if (path) {
        path.style.animation = 'none' // Remove any active animation
        // Reset strokeDashoffset to hide the line (using the CSS variable)
        const pathLength = parseFloat(
          path.style.getPropertyValue('--path-length'),
        )
        path.style.strokeDashoffset = `${pathLength}`
      }
    })

    // Get the path element for the current emphasis index
    const currentPath = pathRefs.current[currentEmphasisIndex]
    if (currentPath) {
      // Get the dynamically calculated animation duration for this path
      const currentAnimationDurationMs = parseFloat(
        currentPath.style.getPropertyValue('--animation-duration'),
      )

      // Report this duration back to the parent component
      if (onAnimationDurationChange) {
        onAnimationDurationChange(currentAnimationDurationMs)
      }

      // Apply the animation to the current path using its dynamic duration
      currentPath.style.animation = `draw-and-reset ${currentAnimationDurationMs}ms ease-in-out forwards`
    }
  }, [currentEmphasisIndex, onAnimationDurationChange])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      id="connection-lines"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="blue-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
        {/* New gradient for horizontal lines */}
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="horizontal-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
        {/* New gradient for vertical lines */}
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="vertical-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const HeroIllustrationAnimated = () => {
  const [emphasisIndex, setEmphasisIndex] = useState(0)
  const [emphasizedTileId, setEmphasizedTileId] = useState(null)
  const [currentLineAnimationDuration, setCurrentLineAnimationDuration] =
    useState(0)
  const connectionsCount = connections.length

  const handleAnimationDurationChange = useCallback(duration => {
    setCurrentLineAnimationDuration(duration)
  }, [])

  useEffect(() => {
    if (connectionsCount === 0 || currentLineAnimationDuration === 0) return
    // Function to advance to the next line in the animation sequence
    const emphasisStartDelay = currentLineAnimationDuration * 0.25
    const emphasisEndDelay = currentLineAnimationDuration
    // The line segment's end leaves the destination at 100% of the animation (stroke-dashoffset: -pathLength)
    const currentConnection = connections[emphasisIndex]
    const fromTileId = currentConnection ? currentConnection.from : null
    const toTileId = currentConnection ? currentConnection.to : null

    let emphasisStartTimer
    let emphasisEndTimer
    setEmphasizedTileId(null)

    if (currentConnection) {
      if (fromTileId === 'C3') {
        // Condition: if the connection starts FROM C3
        // If the connection starts from C3, emphasize the 'to' tile when the line segment reaches it
        emphasisStartTimer = setTimeout(() => {
          setEmphasizedTileId(toTileId)
        }, emphasisStartDelay)
        // Remove emphasis when the line starts to disappear
        emphasisEndTimer = setTimeout(() => {
          setEmphasizedTileId(null)
        }, emphasisEndDelay)
      } else if (toTileId === 'C3') {
        // Condition: if the connection goes TO C3
        // If the destination is C3, emphasize the 'from' tile immediately
        setEmphasizedTileId(fromTileId)
        // Remove emphasis when the line starts to disappear
        emphasisEndTimer = setTimeout(() => {
          setEmphasizedTileId(null)
        }, emphasisEndDelay)
      } else {
        // For all other connections (neither from nor to C3), emphasize the 'to' tile when the line segment reaches it
        emphasisStartTimer = setTimeout(() => {
          setEmphasizedTileId(toTileId)
        }, emphasisStartDelay)
        // Remove emphasis when the line starts to disappear
        emphasisEndTimer = setTimeout(() => {
          setEmphasizedTileId(null)
        }, emphasisEndDelay)
      }
    }

    // Set a timeout for the emphasis to end and to advance to the next line
    const nextLineTimer = setTimeout(() => {
      // Cycle to the next connection in the array
      setEmphasisIndex(prevIndex => (prevIndex + 1) % connectionsCount)
    }, emphasisEndDelay)

    // Cleanup function to clear timeouts when the component unmounts or dependencies change
    return () => {
      clearTimeout(emphasisStartTimer)
      clearTimeout(nextLineTimer)
      clearTimeout(emphasisEndTimer)
    } // Cleanup timeout on unmount or re-render
  }, [emphasisIndex, connectionsCount, currentLineAnimationDuration])

  return (
    <div className="custom-grid-container relative grid justify-center items-center">
      <div id="custom-grid" className="grid relative gap-3 w-full custom-grid">
        <GridTile gridArea="D2" hasEmphasis={emphasizedTileId === 'D2'}>
          <MemoizedIconTile Icon={D2} hasEmphasis={emphasizedTileId === 'D2'} />
        </GridTile>
        <GridTile gridArea="B1" hasEmphasis={emphasizedTileId === 'B1'}>
          <MemoizedIconTile Icon={B1} hasEmphasis={emphasizedTileId === 'B1'} />
        </GridTile>
        <GridTile gridArea="A2" hasEmphasis={emphasizedTileId === 'A2'}>
          <MemoizedIconTile Icon={A2} hasEmphasis={emphasizedTileId === 'A2'} />
        </GridTile>
        <GridTile gridArea="E3" hasEmphasis={emphasizedTileId === 'E3'}>
          <MemoizedIconTile Icon={E3} hasEmphasis={emphasizedTileId === 'E3'} />
        </GridTile>
        <GridTile gridArea="A4" hasEmphasis={emphasizedTileId === 'A4'}>
          <MemoizedIconTile Icon={A4} hasEmphasis={emphasizedTileId === 'A4'} />
        </GridTile>
        <GridTile gridArea="C6" hasEmphasis={emphasizedTileId === 'C6'}>
          <MemoizedIconTile Icon={C6} hasEmphasis={emphasizedTileId === 'C6'} />
        </GridTile>
        <GridTile gridArea="D1" hasEmphasis={emphasizedTileId === 'D1'}>
          <MemoizedIconTile
            Icon={D1}
            hasEmphasis={emphasizedTileId === 'D1'}
            darkFill={'white'}
          />
        </GridTile>
        <GridTile gridArea="B3" hasEmphasis={emphasizedTileId === 'B3'}>
          <MemoizedIconTile Icon={B3} hasEmphasis={emphasizedTileId === 'B3'} />
        </GridTile>
        <GridTile gridArea="E5" hasEmphasis={emphasizedTileId === 'E5'}>
          <MemoizedIconTile Icon={E5} hasEmphasis={emphasizedTileId === 'E5'} />
        </GridTile>
        <GridTile gridArea="B5" hasEmphasis={emphasizedTileId === 'B5'}>
          <MemoizedIconTile Icon={B5} hasEmphasis={emphasizedTileId === 'B5'} />
        </GridTile>
        <GridTile gridArea="E4" hasEmphasis={emphasizedTileId === 'E4'}>
          <MemoizedIconTile Icon={E4} hasEmphasis={emphasizedTileId === 'E4'} />
        </GridTile>
        <GridTile gridArea="D4" hasEmphasis={emphasizedTileId === 'D4'}>
          <MemoizedIconTile Icon={D4} hasEmphasis={emphasizedTileId === 'D4'} />
        </GridTile>
        <GridTile gridArea="E1" hasEmphasis={emphasizedTileId === 'E1'}>
          <MemoizedIconTile Icon={E1} hasEmphasis={emphasizedTileId === 'E1'} />
        </GridTile>
        <GridTile gridArea="F1" hasEmphasis={emphasizedTileId === 'F1'}>
          <MemoizedIconTile Icon={F1} hasEmphasis={emphasizedTileId === 'F1'} />
        </GridTile>
        <GridTile gridArea="F3" hasEmphasis={emphasizedTileId === 'F3'}>
          <MemoizedIconTile
            Icon={F3}
            hasEmphasis={emphasizedTileId === 'F3'}
            fill="#020617"
            darkFill={'white'}
          />
        </GridTile>
        <GridTile gridArea="A1" hasEmphasis={emphasizedTileId === 'A1'}>
          <MemoizedIconTile Icon={A1} hasEmphasis={emphasizedTileId === 'A1'} />
        </GridTile>
        <GridTile gridArea="A5" hasEmphasis={emphasizedTileId === 'A5'}>
          {/* For A5, also passing `fill` prop, so we handle it differently */}
          <MemoizedIconTile
            Icon={A5}
            hasEmphasis={emphasizedTileId === 'A5'}
            fill="rgb(0,120,212)"
          />
        </GridTile>
        <GridTile gridArea="F6" hasEmphasis={emphasizedTileId === 'F6'}>
          <MemoizedIconTile Icon={F6} hasEmphasis={emphasizedTileId === 'F6'} />
        </GridTile>
        <GridTile gridArea="C3" title="Walker" hasEmphasis pulse>
          <MemoizedIconTile
            Icon={Centroid}
            hasEmphasis={emphasizedTileId === 'C3'}
            darkFill="white"
          />
        </GridTile>
        <GridTile gridArea="A6">
          <MemoizedIconTile Icon={A6} hasEmphasis={emphasizedTileId === 'A6'} />
        </GridTile>
        <GridTile gridArea="C1" hasEmphasis={emphasizedTileId === 'C1'}>
          <MemoizedIconTile
            Icon={C1}
            hasEmphasis={emphasizedTileId === 'C1'}
            darkFill={'white'}
          />
        </GridTile>
        <GridTile gridArea="B6">
          <MemoizedIconTile Icon={B6} hasEmphasis={emphasizedTileId === 'B6'} />
        </GridTile>
        <GridTile gridArea="F4" hasEmphasis={emphasizedTileId === 'F4'}>
          <MemoizedIconTile Icon={F4} hasEmphasis={emphasizedTileId === 'F4'} />
        </GridTile>
        <GridTile gridArea="E6" hasEmphasis={emphasizedTileId === 'E6'}>
          <MemoizedIconTile Icon={E6} hasEmphasis={emphasizedTileId === 'E6'} />
        </GridTile>
        <GridTile gridArea="D5">
          <MemoizedIconTile Icon={D5} hasEmphasis={emphasizedTileId === 'D5'} />
        </GridTile>
        <ConnectionLines
          connections={connections}
          currentEmphasisIndex={emphasisIndex}
          onAnimationDurationChange={handleAnimationDurationChange}
        />
      </div>
    </div>
  )
}

export default HeroIllustrationAnimated
