import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './Qalifications.module.scss';
var classNames = require('classnames');

export const Qualifications = ({ expPoints, name, description}) => {

  const totalStarts = 5;

  const renderStars = () => {
    let starsArray = [];
    for (let i = 0; i < totalStarts; i++) {
      starsArray.push(
        <span aria-hidden="true" key={i} className={ classNames([styles.rating__star, i > expPoints - 1 ? styles['rating__star--empty'] : '']) }></span>
      )
      
    }
    return starsArray;
  }
  

  return (
    <><dt className={styles.qualification-name}>
        {name}
      </dt>
      <dd>
        <span className={styles.rating} role="img" aria-label={ name + ': ' + expPoints + ' out of 5 stars' }>
          {renderStars()}
        </span>
      </dd>
    </>
  )
}

Qualifications.propTypes = {
  name: PropTypes.string.isRequired,
  expPoints: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
}