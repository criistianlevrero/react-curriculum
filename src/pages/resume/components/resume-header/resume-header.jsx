//import { Button } from '@components/button/button';
import styles from './resume-header.module.scss'

import PropTypes from 'prop-types';

export const ResumeHeader = ({name, subheading}) => {
    return (
        <>
            <header className={styles.header} >
                {/* <Button iconName="i18n" showLabel={true} iconPosition={'right'} onClick={()=>console.log('asda')}>Change language</Button> */}
                <h1 className={styles.headerTitle}>{name}</h1>
                <p className={styles.headerDescription}>{subheading}</p>
            </header>
        </>
    )
}

ResumeHeader.propTypes = {
  name: PropTypes.string.isRequired,
  subheading: PropTypes.string,
};
