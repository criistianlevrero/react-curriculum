import styles from './side-infirmation.module.scss';
import { PropTypes } from 'prop-types';

import { Card } from '@components/card/card';
import { Button } from '@components/button/button';


export const SideInfirmation = ({ profileImage, mediaLinks}) => {
  
  const onButtonClick = (evt) => {
    console.info('click', evt)
  }

  const contactList = mediaLinks.items.filter(item => item.iconWithLabel )
  const socialList = mediaLinks.items.filter(item => !item.iconWithLabel )

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
              {contactList.map((link, index)=>
                <li key={index}><Button iconName={link.iconId} label={link.linkLabel} showLabel={true} onClick={onButtonClick} /></li>
              )}
            </ul>
            <ul className={styles.contactSocial}>
              {socialList.map((link, index)=>
                <li key={index}><Button iconName={link.iconId} label={link.linkLabel} showLabel={false} onClick={onButtonClick} /></li>
              )}
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

SideInfirmation.propTypes = {
  profileImage: PropTypes.string.isRequired,
  mediaLinks: PropTypes.object,
}