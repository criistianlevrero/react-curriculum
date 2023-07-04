import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './company.module.scss';



export const Company = ({ companyName, from, to, children}) => {

  var classNames = require('classnames');

  return (
    <section className='experience'>
      <h3 className='experience__company-name'>{companyName}({from} - {to})</h3>
      <div className='experience__content-layout'>
        {children}
      </div>
    </section>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }