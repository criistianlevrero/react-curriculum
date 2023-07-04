import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './project.module.scss';


export const Project = ({ projectName, year, children}) => {

  var classNames = require('classnames');

  return (
    <div>
      <div className='experience__year'>{year}</div>
      <div>{projectName}</div>
      <div className='experience__content-richtext'>
        {children}
      </div>
    </div>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }