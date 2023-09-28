import { PropTypes } from 'prop-types';

import styles from './card.module.scss';

export const Card = ({children, borders = false}) => {

  return (
    <div className={styles[borders ? 'cardWithBorder' : 'card']}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  borders: PropTypes.bool,
}