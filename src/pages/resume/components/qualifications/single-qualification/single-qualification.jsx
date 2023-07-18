import { PropTypes } from 'prop-types';
import styles from './single-qualification.module.scss';

export const SingleQualification = ({ expPoints, name, description}) => {

  const totalStarts = 5;

  const renderStars = () => {
    let starsArray = [];
    for (let i = 0; i < totalStarts; i++) {
      starsArray.push(
        <span aria-hidden="true" key={i} className={ i > expPoints - 1 ? styles.starEmpty : styles.star }></span>
      )
      
    }
    return starsArray;
  }
  

  return (
    <div className={styles.qualification}>
      <dt className={styles.name}>
        {name}
      </dt>
      <dd>
        <span className={styles.rating} role="img" aria-label={ name + ': ' + expPoints + ' out of 5 stars' }>
          {renderStars()}
        </span>
      </dd>
    </div>
  )
}

SingleQualification.propTypes = {
  name: PropTypes.string.isRequired,
  expPoints: PropTypes.number.isRequired,
  description: PropTypes.array.isRequired,
}