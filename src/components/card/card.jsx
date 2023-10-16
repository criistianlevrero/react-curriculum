import { PropTypes } from 'prop-types';

import styles from './card.module.scss';

export const Card = ({children, border = false}) => {

  return (
    <div data-testid='card' className={styles[border ? 'cardWithBorder' : 'card']}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  border: PropTypes.bool,
}