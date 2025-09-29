'use client'

import { cloneElement, useEffect, useRef, useState } from 'react'

const DataSourceConnection = ({
  size,
  animated,
  fromSource,
  index,
  speed,
  enabled,
  destination,
  children,
  completeAnimation,
}) => {
  const [value, setValue] = useState(size)
  const end = -1 * size
  const [isEmphasized, setIsEmphasized] = useState(false)

  const animationFrameIdRef = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    if (!animated || isAnimating.current) {
      setValue(size)
      return
    }

    isAnimating.current = true

    const animate = () => {
      setValue(prevValue => {
        const delta = Math.max((prevValue - end) * 0.03, 0.5)
        const next = prevValue - delta

        if (fromSource) {
          if (Math.abs(next - end) < 0.5) {
            setIsEmphasized(false)
            completeAnimation(index)
            return size
          } else if (next <= 0 && prevValue >= 0) {
            setIsEmphasized(true)
            return next
          } else {
            return next
          }
        } else {
          if (prevValue >= size) {
            setIsEmphasized(true)
          } else if (next <= end + speed) {
            setIsEmphasized(false)
            completeAnimation(index)
          }
          if (next <= end) {
            return size
          } else if (next <= 0 && prevValue >= 0) {
            return next
          } else {
            return next
          }
        }
      })

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animationFrameIdRef.current = requestAnimationFrame(animate)

    return () => {
      isAnimating.current = false
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [animated, size, end, fromSource, speed, index, completeAnimation])

  if (!enabled) {
    return destination
  }

  const element = destination

  const tile = cloneElement(element, {
    hasEmphasis: isEmphasized,
  })
  return (
    <>
      {children(value)}
      {tile}
    </>
  )
}

export default DataSourceConnection
