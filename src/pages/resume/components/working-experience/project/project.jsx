import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './project.module.scss';


export const Project = ({ projectName, year, children}) => {

  return (
    <div className={styles.layout}>
      <div className={styles.year}>{year}</div>
      <div className={styles.content}>
        <h4 className={styles.projectName}>{projectName}</h4>
        <div className={styles.description}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }