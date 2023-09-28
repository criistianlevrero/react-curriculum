import { PropTypes } from 'prop-types';

import styles from './main-with-aside.module.scss';

export default function MainWithAsideLayout({ aside, main }) {

 
  return (
    <div className={styles.mainWithAsideLayout}>
      <aside className={styles.aside}>
        {aside}
      </aside>
      <main className={styles.main}>
        {main}
      </main>
    </div>
  );
}

MainWithAsideLayout.propTypes = {
  aside: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  main: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}