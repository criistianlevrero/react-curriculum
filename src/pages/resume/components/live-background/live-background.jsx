import { useLayoutEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

import { Canvas, CANVAS_DOWNSCALE } from '@components/canvas/canvas';
import styles from './live-background.module.scss';

import { BackgroundPicture, defaultTransformMatrix } from './helpers/background-picture';

import image1 from '@assets/live-background/23.webp'
import image2 from '@assets/live-background/6.webp'
import image3 from '@assets/live-background/14.webp'
import image5 from '@assets/live-background/4.webp'

const pictures = [
  {
    className: styles.image1,
    imageSrc: image1,
    gradientColors: ['#F0B1B1', '#C18FFE'],
    polygon: [
      [0, 0],
      [100, 0],
      [100, 69],
      [0, 89]
    ],
    lowerGradientPoly:[
      [0, 87],
      [100, 60],
      [100, 70],
      [0, 90]
    ]
  },
  {
    className: styles.image2,
    imageSrc: image2,
    gradientColors: ['#B1F0D5', '#FE9190'],
    polygon: [
      [0, 21],
      [100, 1],
      [100, 99],
      [0, 89]
    ],
    lowerGradientPoly:[
      [0, 87],
      [100, 90],
      [100, 100],
      [0, 90]
    ],
    upperGradientPoly:[
      [0, 20],
      [100, 0],
      [100, 10],
      [0, 23]
    ],
    scrollOffset: -1800
  },
  {
    className: styles.image3,
    imageSrc: image3,
    gradientColors: ['#F0B1B1', '#C08FFF'],
    polygon: [
      [0, 1],
      [100, 21],
      [100, 89],
      [0, 99]
    ],
    lowerGradientPoly:[
      [0, 91],
      [100, 87],
      [100, 90],
      [0, 100]
    ],
    upperGradientPoly:[
      [0, 0],
      [100, 20],
      [100, 23],
      [0, 8]
    ],
    scrollOffset: -50
  },
  {
    className: styles.image5,
    imageSrc: image5,
    gradientColors: ['#F0B1B1', '#C18FFE'],
    polygon: [
      [0, 21],
      [100, 1],
      [100, 100],
      [0, 100]
    ],
    upperGradientPoly:[
      [0, 20],
      [100, 0],
      [100, 7],
      [0, 23]
    ],
    scrollOffset: -6600
  }
]

const AnimatedPicture = ({ className, ...config }) => {
  const picture = BackgroundPicture(config)
  return <Canvas draw={picture.render} resize={picture.resize} className={className}></Canvas>
}

const polygonType = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))

const pictureProps = {
  className: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  polygon: polygonType.isRequired,
  scrollOffset: PropTypes.number,
  gradientColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  lowerGradientPoly: polygonType,
  upperGradientPoly: polygonType,
}

AnimatedPicture.propTypes = pictureProps

const toClipPath = (dots) => `polygon(${dots.map(([x, y]) => `${x}% ${y}%`).join(', ')})`

// Same drawing as BackgroundPicture, built with DOM/CSS so it is printed as vectors.
// The pattern is frozen at the scroll position where the picture reaches the top of the viewport.
const StaticPicture = ({ className, imageSrc, polygon, scrollOffset = 0, gradientColors, lowerGradientPoly, upperGradientPoly }) => {
  const containerRef = useRef(null)
  const [pattern, setPattern] = useState(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    // Canvas units: the canvas is drawn at CANVAS_DOWNSCALE and stretched to its CSS size
    const width = container.clientWidth * CANVAS_DOWNSCALE
    const height = container.clientHeight * CANVAS_DOWNSCALE
    const scroll = container.offsetTop + scrollOffset
    const matrix = defaultTransformMatrix(new DOMMatrix(), width / 100, height / 100, scroll)
    setPattern({ matrix, padding: 2 * (width + height) })
  }, [scrollOffset])

  const gradient = `linear-gradient(to bottom right, ${gradientColors.join(', ')})`

  return (
    <div ref={containerRef} className={`${className} ${styles.static}`}>
      <div className={styles.staticPolygon} style={{ clipPath: toClipPath(polygon) }}>
        {pattern && (
          <div
            className={styles.staticPattern}
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${pattern.padding}px ${pattern.padding}px`,
              width: 2 * pattern.padding,
              height: 2 * pattern.padding,
              transform: `scale(${1 / CANVAS_DOWNSCALE}) ${pattern.matrix} translate(${-pattern.padding}px, ${-pattern.padding}px)`,
            }}
          />
        )}
      </div>
      {[lowerGradientPoly, upperGradientPoly].filter(Boolean).map((dots, i) => (
        <div key={i} className={styles.staticPolygon} style={{ clipPath: toClipPath(dots), backgroundImage: gradient }} />
      ))}
    </div>
  )
}

StaticPicture.propTypes = pictureProps

export const LiveBackground = ({ isStatic = false }) => {
  const Picture = isStatic ? StaticPicture : AnimatedPicture

  return (
    <>
      {pictures.map((config) => <Picture key={config.className} {...config} />)}
    </>
  )
}

LiveBackground.propTypes = {
  isStatic: PropTypes.bool,
}
