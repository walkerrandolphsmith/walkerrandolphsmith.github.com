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
  bleedTop = null,
  bleedBottom = null,
  bleedTopDark = null,
  bleedBottomDark = null,
  bleedGuideSolidColor = 'rgba(66, 71, 112, 0.06)',
  bleedGuideDashedColor = 'rgba(66, 71, 112, 0.09)',
  bleedGuideSolidColorDark = 'rgba(66, 71, 112, 0.06)',
  bleedGuideDashedColorDark = 'rgba(66, 71, 112, 0.09)',
}) =>
  createElement(
    as,
    {
      className: `Section relative z-10 ${bleedTop ? 'Section--bleed' : ''} ${angleTop ? 'Section--angleTop' : ''} ${angleBoth ? 'Section--angleBoth' : ''} ${angleBottom ? 'Section--angleBottom' : ''} ${padBottom ? 'Section--padBottom' : ''} ${noPaddingOnPrint ? 'Section--noPaddingOnPrint' : ''} ${noPadding ? 'Section--noPadding' : 'Section--paddingNormal'} ${noBottomPadding ? 'Section--noBottomPadding' : ''} ${noTopPadding ? 'Section--noTopPadding' : ''} ${printHidden ? 'print:hidden' : ''}`,
      style: bleedTop
        ? ({
            ['--bleedTop' as string]: bleedTop,
            ['--bleedBottom' as string]: bleedBottom ?? bleedTop,
            ['--bleedTopDark' as string]: bleedTopDark ?? bleedTop,
            ['--bleedBottomDark' as string]:
              bleedBottomDark ?? bleedBottom ?? bleedTop,
          } as React.CSSProperties)
        : undefined,
    },
    // A bleed section shows the section above in the triangle over its
    // angled top. These unskewed guides continue that section's guide lines
    // down to the diagonal. The skewed background covers them everywhere else.
    bleedTop && (
      <div
        className="Section__bleedGuides"
        aria-hidden="true"
        style={
          {
            ['--guideSolidColor' as string]: bleedGuideSolidColor,
            ['--guideDashedColor' as string]: bleedGuideDashedColor,
            ['--guideSolidColorDark' as string]: bleedGuideSolidColorDark,
            ['--guideDashedColorDark' as string]: bleedGuideDashedColorDark,
          } as React.CSSProperties
        }
      >
        <div className="Guides">
          <div className="Guides__container">
            <div className="Guides__guide"></div>
            <div className="Guides__guide"></div>
            <div className="Guides__guide"></div>
            <div className="Guides__guide"></div>
            <div className="Guides__guide"></div>
          </div>
        </div>
      </div>
    ),
    <div
      className="Section__masked"
      style={
        {
          // clip, not hidden: a hidden box is still a scroll container, and an
          // anchor jump scrolls it by the skewed background's overhang.
          ['--sectionOverflow' as string]: allowOverflow ? 'visible' : 'clip',
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
