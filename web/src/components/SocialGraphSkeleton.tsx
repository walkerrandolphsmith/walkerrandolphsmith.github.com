import React from 'react'

const SocialGraphSkeleton = () => {
  const ROWS = 7
  const COLS = 14
  return (
    <div className="flex items-start font-inter">
      <div
        className="grid gap-1 rounded-lg shadow-xl bg-[#0a2540] dark:bg-[oklch(27.4%_.006_286.033)] p-3 mr-1"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
          width: 'auto',
          height: 'auto',
          maxWidth: '95vw',
          overflowX: 'auto',
        }}
      >
        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLS }).map((__, col) => (
            <div
              key={`${row}-${col}`}
              className="w-[16px] h-[16px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px] lg:w-[32px] lg:h-[32px] rounded-sm transition-colors duration-500 ease-in-out"
              style={{
                backgroundColor: '#ebedf0',
              }}
            ></div>
          )),
        )}
      </div>
    </div>
  )
}

export default SocialGraphSkeleton
