'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// Main App component
const ROWS = 7
const COLS = 14 // Using user's provided COLS value
const PAUSE_DURATION_FRAMES = 1
// Define GitHub-like green shades for contribution levels, plus a light gray for no contributions
const COLORS = [
  '#ebedf0', // Level 0: No contributions (light gray)
  '#9be9a8', // Level 1: Low contributions (light green)
  '#40c463', // Level 2: Medium contributions (medium green)
  '#30a14e', // Level 3: High contributions (darker green)
  '#216e39', // Level 4: Very high contributions (darkest green)
]
// Constants to fine-tune the wave behavior and appearance
// Increased WAVE_SPEED for significantly faster progression of the green wave
const WAVE_SPEED = 0.2 // Controls how fast the wave moves horizontally (higher = faster)
// Reduced WAVE_ACTIVE_WIDTH for a narrower, more distinct wave front
const WAVE_ACTIVE_WIDTH = COLS // The "width" of the wave's leading edge in columns
// WAVE_DECAY_OFFSET: How many columns behind the wave front a cell turns gray
// A positive value ensures cells stay green for a visible duration after being activated.
const WAVE_DECAY_OFFSET = COLS * 6
const SpcialGraphInteractive = () => {
  // Define the number of rows (days) and columns (weeks) for the grid

  // useRef to store the actual grid color indices to avoid excessive re-renders.
  // This mutable ref will hold the current color index for each cell [row][col].
  const gridStateRef = useRef(
    Array(ROWS)
      .fill(0)
      .map(() => Array(COLS).fill(0)), // Initialize all cells to color index 0 (gray)
  )

  // useState to trigger re-renders only when the visual grid needs to update.
  // This state holds a copy of gridStateRef.current that React will render.
  const [displayGridColors, setDisplayGridColors] = useState(
    gridStateRef.current,
  )

  // useRef to store the animation time, also to avoid re-renders on every frame.
  const animationTimeRef = useRef(0)
  // useRef to store the requestAnimationFrame ID for cleanup.
  const animationFrameId = useRef(null)

  const pauseCountdownRef = useRef(0)

  const sparsityRef = useRef(0.7)
  const randomSeedRef = useRef(Math.random())

  const { ref, inView } = useInView({
    threshold: 0.8,
  })

  // This callback function drives the animation loop, called repeatedly by requestAnimationFrame.
  const animate = useCallback(() => {
    if (pauseCountdownRef.current > 0) {
      pauseCountdownRef.current -= 1
      animationFrameId.current = requestAnimationFrame(animate)
      return // Skip grid update during pause
    }
    // Increment the animation time. This value dictates the progression of the wave.
    animationTimeRef.current += 0.5

    // Calculate the current leading edge position of the wave based on animation time and speed.
    const currentWaveFront = animationTimeRef.current * WAVE_SPEED

    // Get the current grid data from the ref.
    const currentGridColors = gridStateRef.current
    let gridChanged = false // Flag to track if any cell color has changed in this frame.

    // Determine if the wave has progressed far enough to trigger a full grid reset for a new loop.
    // Reset when the *tail* of the decaying wave has cleared the rightmost column.
    // This ensures a smooth transition before the quick reset.
    const animationCycleLength = COLS + WAVE_DECAY_OFFSET
    const shouldFullReset = currentWaveFront >= animationCycleLength

    if (shouldFullReset) {
      // Create a brand new grid filled entirely with 0 (gray) for an instant reset.
      const resetGrid = Array(ROWS)
        .fill(0)
        .map(() => Array(COLS).fill(0))
      gridStateRef.current = resetGrid // Update the ref
      setDisplayGridColors(resetGrid) // Force a re-render with the all-gray grid
      randomSeedRef.current = Math.random()
      sparsityRef.current = Math.floor((Math.random() * 0.36 + 0.4) * 100) / 100

      pauseCountdownRef.current = PAUSE_DURATION_FRAMES // Start the pause
      animationTimeRef.current = 0 // Reset animation time for the next loop after pause

      // Request the next animation frame, which will now handle the pause, and then return.
      animationFrameId.current = requestAnimationFrame(animate)
      return
    }

    // Create a new 2D array to store the updated grid colors for this frame.
    const newGridColors = Array(ROWS)
      .fill(0)
      .map(() => Array(COLS).fill(0))

    // Iterate over each cell in the grid to determine its new color.
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let cellColorIndex = currentGridColors[row][col] // Start with the cell's current color index.

        // Calculate the start and end columns of the active wave window.
        const waveActiveStart = currentWaveFront - WAVE_ACTIVE_WIDTH
        const waveActiveEnd = currentWaveFront

        // Check if the current column is within the actively "activating" wave window.
        const isActiveInWindow = col >= waveActiveStart && col < waveActiveEnd

        // Decay logic: a cell turns gray if the wave has passed it long enough ago.
        const isPastDecayPoint = false

        // "75% mark" decay logic: if the wave front has passed 75% of the grid,
        // and this column is significantly to the left of the wave front, it should turn gray.
        // This ensures earlier decay for older contributions on the left side.
        const seventyFivePercentMark = COLS * 1
        const isPast75PercentAndOld =
          currentWaveFront > seventyFivePercentMark &&
          col < currentWaveFront - (WAVE_ACTIVE_WIDTH + WAVE_DECAY_OFFSET)

        if (isActiveInWindow) {
          // If the cell is in the active window and is currently gray (meaning it hasn't been set yet)
          if (cellColorIndex === 0) {
            // Use a pseudo-random value based on the cell's fixed position (row, col)
            // This ensures that the sparsity decision is deterministic for each cell,
            // preventing flickering as Math.random() would otherwise do.
            const cellPseudoRandom =
              ((row * 31 + col * 17 + randomSeedRef.current * 1000) % 100) / 100 // Simple unique value per cell
            if (cellPseudoRandom < sparsityRef.current) {
              // If the sparsity check passes, assign a green shade.
              // The shade is chosen deterministically based on the column, creating a varied pattern.
              cellColorIndex = (col % (COLORS.length - 1)) + 1 // Cycles through green levels 1,2,3,4
            }
          }
        } else if (isPastDecayPoint || isPast75PercentAndOld) {
          // If the wave has passed this cell's general decay point OR
          // the 75% rule applies (meaning it's an old contribution on the left and wave is far right),
          // the cell should revert to gray.
          cellColorIndex = 0
        }

        // If the color index for this cell has changed, mark that the grid has changed.
        if (currentGridColors[row][col] !== cellColorIndex) {
          gridChanged = true
        }
        // Update the new grid array with the determined color index for the current cell.
        newGridColors[row][col] = cellColorIndex
      }
    }

    // Update the ref with the new grid data.
    gridStateRef.current = newGridColors

    // Only trigger a React re-render if the grid visually changed or if a full reset is needed.
    // This optimizes performance by not re-rendering on every single animation frame unless necessary.
    if (gridChanged) {
      setDisplayGridColors(newGridColors)
    }

    // Request the next animation frame, continuing the loop.
    animationFrameId.current = requestAnimationFrame(animate)
  }, []) // The `animate` function itself is stable due to useCallback, so no dependencies here.

  // useEffect hook to manage the animation lifecycle (start on mount, stop on unmount).
  useEffect(() => {
    if (!inView) return
    // Start the animation when the component mounts.
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup function: cancel the animation frame when the component unmounts to prevent memory leaks.
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate, inView]) // Re-run this effect only if the 'animate' function itself changes (which it won't due to useCallback).

  // Render the grid of squares.
  return (
    <div className="flex items-start font-inter" ref={ref}>
      <div
        className="grid gap-1 rounded-lg shadow-xl bg-[#0a2540] dark:bg-[oklch(27.4%_.006_286.033)] p-3 mr-1"
        style={{
          // Dynamically set grid columns and rows based on COLS and ROWS constants.
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
          // Ensure the grid adapts to content and screen size.
          width: 'auto',
          height: 'auto',
          maxWidth: '95vw', // Limit overall width for larger screens
          overflowX: 'auto', // Allow horizontal scrolling if the grid is too wide for the screen
        }}
      >
        {/* Generate grid squares using nested loops based on ROWS and COLS. */}
        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLS }).map((__, col) => (
            <div
              key={`${row}-${col}`} // Unique key for each square for React's reconciliation.
              // Apply Tailwind CSS classes for consistent sizing and rounded corners.
              // Removed `transition-colors` to ensure the shade snaps and remains fixed once set,
              // as per your request, preventing intermediate color changes.
              className="w-[16px] h-[16px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] lg:w-[32px] lg:h-[32px] rounded-sm transition-colors duration-500 ease-in-out"
              style={{
                // Set the background color based on the current state from `displayGridColors`.
                backgroundColor: COLORS[displayGridColors[row][col]],
              }}
            ></div>
          )),
        )}
      </div>
    </div>
  )
}

export default SpcialGraphInteractive
