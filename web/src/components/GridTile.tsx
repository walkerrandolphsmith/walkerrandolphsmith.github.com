import { JSXElementConstructor, memo, ReactElement } from 'react'

type GridArea =
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B4'
  | 'B5'
  | 'B6'
  | 'C1'
  | 'C2'
  | 'C3'
  | 'C4'
  | 'C5'
  | 'C6'
  | 'D1'
  | 'D2'
  | 'D3'
  | 'D4'
  | 'D5'
  | 'D6'
  | 'E1'
  | 'E2'
  | 'E3'
  | 'E4'
  | 'E5'
  | 'E6'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'

const titleByCoordinates = {
  A1: 'GraphQL',
  B1: 'Terraform',
  F6: 'Jest',
  A5: 'ADO',
  A2: 'React',
  A4: 'K8s',
  F4: 'Cypress',
  C1: 'Kafka',
  B6: 'NodeJS',
  A6: 'Figma',
  D1: 'OpenAI',
  D4: 'Python',
  C6: 'Typescript',
  E1: 'SQL',
  D2: 'numpy',
  E4: 'bash',
  E5: 'git',
  B3: 'mongoDB',
  E3: 'Azure',
  B5: 'Docker',
  E6: 'C#',
  D5: 'Redis',
  F1: 'K6',
  F3: 'Nx',
}

type GridTileProps = {
  title?: string
  gridArea?: GridArea
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>
  hasEmphasis?: boolean
  size?: string
  iconSize?: number
  pulse?: boolean
}

const GridTile = memo(
  ({
    title = null,
    gridArea,
    children,
    hasEmphasis = false,
    size,
    pulse = false,
  }: GridTileProps) => {
    const actual = title ?? titleByCoordinates[gridArea]

    return (
      <div
        aria-hidden="true"
        id={gridArea}
        className={`
        ${hasEmphasis ? 'scale-[1.105] shadow-lg' : 'scale-[0.9]'} 
        ${hasEmphasis ? 'duration-1000 ease-out' : 'duration-200 ease-in'} 
        ${size ? size : ''} 
        group z-10 hover:scale-[1.105] hover:shadow-lg relative rounded-lg flex items-center justify-center cursor-pointer flex-col rounded-lg custom-grid-tile bg-white dark:bg-slate-800 `}
        style={{
          animation: pulse ? 'throbe 2.5s infinite' : 'none',
          gridArea: gridArea,
          willChange: 'transform, opacity',
        }}
      >
        {children}
        <span
          className={`text-xs md:text-sm font-semibold text-zinc-700 dark:text-white group-hover:max-h-6 group-hover:opacity-100 group-hover:scale-100
          ${pulse || hasEmphasis ? 'opacity-100 scale-100 max-h-6' : 'opacity-0 scale-75 max-h-0'} 
          ${hasEmphasis ? 'duration-1000 ease-out' : 'duration-200 ease-in'}
          `}
        >
          {actual}
        </span>
      </div>
    )
  },
)

GridTile.displayName = 'GridTile'

export default GridTile
