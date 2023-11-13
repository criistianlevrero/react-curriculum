import { PropTypes } from 'prop-types';

import styles from './toast-message.module.scss';

export const ToastMessage = ({ children }) => {

  return (
    <section className={styles.toastMessage}>
      {children}
    </section>
  )
}

ToastMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}