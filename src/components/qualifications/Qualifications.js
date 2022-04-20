import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import './Qalifications.scss';

export const Qualifications = ({ expPoints, name, description}) => {

  var classNames = require('classnames');

  const totalStarts = 5;

  const renderStars = () => {
    let starsArray = [];
    for (let i = 0; i < totalStarts; i++) {
      starsArray.push(
        <span aria-hidden="true" key={i} className={ classNames(['rating__star', i > expPoints - 1 ? ' rating__star--empty' : '']) }></span>
      )
      
    }
    return starsArray;
  }
  

  return (
    <><dt className="qualification-name">
        {name}
      </dt>
      <dd>
        <span className="rating" role="img" aria-label={ name + ': ' + expPoints + ' out of 5 stars' }>
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