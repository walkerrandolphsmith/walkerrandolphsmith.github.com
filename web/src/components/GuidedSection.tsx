import { createElement } from 'react'

const GuidedSection = ({
  children,
  as = 'section',
  background = 'transparent',
  backgroundDark = 'transparent',
  guideSolidColor = 'rgba(66, 71, 112, 0.06)',
  guideDashedColor = 'rgba(66, 71, 112, 0.09)',
  guideSolidColorDark = 'rgba(66, 71, 112, 0.06)',
  guideDashedColorDark = 'rgba(66, 71, 112, 0.09)',
  fullWidth = false,
  angleTop = false,
  angleBoth = false,
  angleBottom = false,
  padBottom = false,
  allowOverflow = false,
  printHidden = false,
  noPaddingOnPrint = false,
  noPadding = false,
  noTopPadding = false,
  noBottomPadding = false,
}) =>
  createElement(
    as,
    {
      className: `Section relative z-10 ${angleTop ? 'Section--angleTop' : ''} ${angleBoth ? 'Section--angleBoth' : ''} ${angleBottom ? 'Section--angleBottom' : ''} ${padBottom ? 'Section--padBottom' : ''} ${noPaddingOnPrint ? 'Section--noPaddingOnPrint' : ''} ${noPadding ? 'Section--noPadding' : 'Section--paddingNormal'} ${noBottomPadding ? 'Section--noBottomPadding' : ''} ${noTopPadding ? 'Section--noTopPadding' : ''} ${printHidden ? 'print:hidden' : ''}`,
    },
    <div
      className="Section__masked"
      style={
        {
          ['--sectionOverflow' as string]: allowOverflow ? 'visible' : 'hidden',
          ['--sectionBackgroundColor' as string]: background,
          ['--sectionBackgroundColorDark' as string]: backgroundDark,
        } as React.CSSProperties
      }
    >
      <div className="Section__backgroundMask">
        <div
          className={`Section__background`}
          style={
            {
              ['--backgroundColor' as string]: background,
              ['--backgroundColorDark' as string]: backgroundDark,
              ['--guideSolidColor' as string]: guideSolidColor,
              ['--guideDashedColor' as string]: guideDashedColor,
              ['--guideSolidColorDark' as string]: guideSolidColorDark,
              ['--guideDashedColorDark' as string]: guideDashedColorDark,
            } as React.CSSProperties
          }
        >
          <div className="Guides" aria-hidden="true">
            <div className="Guides__container">
              <div className="Guides__guide"></div>
              <div className="Guides__guide"></div>
              <div className="Guides__guide"></div>
              <div className="Guides__guide"></div>
              <div className="Guides__guide"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="Section__container">
        <div
          className={`Section__layoutContainer${fullWidth ? ' fullWidth' : ''}`}
        >
          <div className="Section__layout">{children}</div>
        </div>
      </div>
    </div>,
  )

export default GuidedSection
