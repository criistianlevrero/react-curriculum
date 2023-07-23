import Canvas from '@components/canvas/canvas';
import styles from './live-background.module.scss';

import { BackgroundPicture } from './helpers/background-picture';

import image1 from '@assets/live-background/1.jpg'
import image2 from '@assets/live-background/2.jpg'
import image3 from '@assets/live-background/5.jpg'

export const LiveBackground = () => {

  const bgImage01 = BackgroundPicture(image1, [
    [0, 0],
    [100, 0],
    [100, 70],
    [0, 90]
  ])

  const bgImage02 = BackgroundPicture(image2, [
    [0, 20],
    [100, 0],
    [100, 100],
    [0, 90]
  ])

  const bgImage03 = BackgroundPicture(image3, [
    [0, 0],
    [100, 20],
    [100, 90],
    [0, 100]
  ])

  return (
    <>
      <Canvas draw={bgImage01.render} resize={bgImage01.resize} className={styles.image1}></Canvas>
      <Canvas draw={bgImage02.render} resize={bgImage02.resize} className={styles.image2}></Canvas>
      <Canvas draw={bgImage03.render} resize={bgImage03.resize} className={styles.image3}></Canvas>
    </>
  )
}
