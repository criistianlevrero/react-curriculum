import { Canvas } from '@components/canvas/canvas';
import styles from './live-background.module.scss';

import { BackgroundPicture } from './helpers/background-picture';

import image1 from '@assets/live-background/23.webp'
import image2 from '@assets/live-background/6.webp'
import image3 from '@assets/live-background/14.webp'
import image4 from '@assets/live-background/8.webp'
import image5 from '@assets/live-background/4.webp'

export const LiveBackground = () => {

  const bgImage01 = BackgroundPicture({
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
  })

  const bgImage02 = BackgroundPicture({
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
  })

  const bgImage03 = BackgroundPicture({
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
  })

  const bgImage04 = BackgroundPicture({
    imageSrc: image4,
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
    scrollOffset: 10000
  })

  const bgImage05 = BackgroundPicture({
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
  })

  return (
    <>
      <Canvas draw={bgImage01.render} resize={bgImage01.resize} className={styles.image1} ></Canvas>
      <Canvas draw={bgImage02.render} resize={bgImage02.resize} className={styles.image2} ></Canvas>
      <Canvas draw={bgImage03.render} resize={bgImage03.resize} className={styles.image3} ></Canvas>
      <Canvas draw={bgImage04.render} resize={bgImage04.resize} className={styles.image4} ></Canvas>
      <Canvas draw={bgImage05.render} resize={bgImage05.resize} className={styles.image5} ></Canvas>
    </>
  )
}
