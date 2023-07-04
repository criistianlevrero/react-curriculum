import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './profile.module.scss';
import { Card } from '../card/card';


export const Profile = ({ profileImage, year, children}) => {
  return (
    <div className={styles.profile}>
      <Card>
        <div className={styles.profile__picture}>
          <img src={profileImage} className={styles.profile__image} alt="una bella foto" />
        </div>
      </Card>
      <div className={styles.profile__card}>
        <Card>
          <div className={styles.profile__contactBox}>
            Hola
            <cl-contactCard itemList="" actionsList=""></cl-contactCard>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Qualifications.propTypes = {
//   companyName: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   description: PropTypes.array.isRequired,
// }