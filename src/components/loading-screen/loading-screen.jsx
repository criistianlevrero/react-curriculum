import styles from './loading-screen.module.scss';

export const LoadingScreen = () => {

  return (
    <section className={styles.container}>
        <div className={styles.indicator}></div>
        Loading...
    </section>
  )
}
