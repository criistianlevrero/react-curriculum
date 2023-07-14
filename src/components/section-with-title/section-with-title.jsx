import styles from './section-with-title.module.scss';

export const SectionWithTitle = ({title, children}) => {

    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </section>
    )
  }
