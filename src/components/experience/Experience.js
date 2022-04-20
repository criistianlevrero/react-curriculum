import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import './Experience.scss';


export const Experience = ({ companyName, year, children}) => {

  var classNames = require('classnames');

  return (
    <section className='experience'>
      <h3 className='experience__company-name'>{companyName}</h3>
      <div className='experience__content-layout'>
        <div className='experience__year'>{year}</div>
        <div className='experience__content-richtext'>
          {children}
        </div>
      </div>
    </section>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }