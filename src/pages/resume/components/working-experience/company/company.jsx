import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './company.module.scss';

export const Company = ({ companyName, from, to, children}) => {

  return (
    <section className={ styles.experience }>
      <h3 className={ styles.companyName }>{companyName}({from} - {to})</h3>
      {children}
    </section>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }