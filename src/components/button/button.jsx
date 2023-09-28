import PropTypes from 'prop-types';

import { Icon } from '@components/icon/icon';
import styles from './button.module.scss';

export const Button = ({ iconName = '', label = '', showLabel = false, onClick = () => {}, href='', target='_self' }) => {
    
    const iconSize = '2rem'
    
    if (href != '') {
        return (
            <a href={href} target={target} aria-label={ label } onClick={onClick} className={styles.link} >
                <Icon name={ iconName } width={iconSize} height={iconSize} />
                { showLabel ? label : '' }
            </a>
        )
    }

    return (
        <button aria-label={ label } onClick={onClick} className={styles.button} >
            <Icon name={ iconName } width={iconSize} height={iconSize} />
            { showLabel ? label : '' }
        </button>
    )
}

Button.propTypes = {
    iconName: PropTypes.string,
    label: PropTypes.string,
    showLabel: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
}
