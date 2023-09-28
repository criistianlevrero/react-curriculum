import { PropTypes } from 'prop-types';

import styles from './section-with-title.module.scss';

export const SectionWithTitle = ({ title, children }) => {

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
}

SectionWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}