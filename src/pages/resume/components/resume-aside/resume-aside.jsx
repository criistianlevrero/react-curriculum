import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './resume-aside.module.scss';
import { Card } from '@components/card/card';
import { Button } from '@components/button/button';


export const ResumeAside = ({ profileImage, year, children}) => {
  
  const onButtonClick = (evt) => {
    console.log('click', evt)
  }

  return (
    <>
      <div className={styles.picture}>
        <Card borders={true}>
          <div className={styles.pictureContainer}>
            <img src={profileImage} className={styles.pictureImg} alt="una bella foto" />
          </div>
        </Card>
      </div>
      <div className={styles.contact}>
        <Card>
          <div className={styles.contactContent}>
            <ul className={styles.contactList}>
              <li><Button iconName='mail' label='cristianlevrero@gmail.com' showLabel={true} onClick={onButtonClick} /></li>
              <li><Button iconName='marker' label='Cordoba, Argentina' showLabel={true} href='https://developer.mozilla.org/es/docs/Web/HTML/Element/a' target='_blank' /></li>
            </ul>
            <ul className={styles.contactSocial}>
              <li><Button iconName='behance' label='behance' onClick={onButtonClick} /></li>
              <li><Button iconName='instagram' label='instagram' href='https://developer.mozilla.org/es/docs/Web/HTML/Element/a' target='_blank' /></li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }