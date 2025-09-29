import { GoDependabot as Centroid } from 'react-icons/go'

import GridTile from './GridTile'

const HeroIllustration = () => (
  <div className="custom-grid-container relative grid justify-center items-center">
    <div className="grid relative w-full custom-grid">
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
      </svg>
      <GridTile gridArea="D2">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="B1">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="A2">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="E3">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'A4'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="C6">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="D1">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="B3">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="E5">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="B5">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'E4'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'D4'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'E1'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'A1'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'A5'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'F6'}>
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea={'C3'} title="Walker" hasEmphasis>
        <Centroid className={`custom-grid-tile-icon transition-transform`} />
      </GridTile>
      <GridTile gridArea="A6">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="C1">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="B6">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="F4">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="E6">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="D5">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="F1">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
      <GridTile gridArea="F3">
        <div className="w-[29px] h-[29px] min-w-[29px] min-h-[29px]" />
      </GridTile>
    </div>
  </div>
)

export default HeroIllustration
