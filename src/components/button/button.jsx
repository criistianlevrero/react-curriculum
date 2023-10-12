import PropTypes from 'prop-types';

import { Icon } from '@components/icon/icon';
import styles from './button.module.scss';

export const Button = ({ iconName = '', label = '', showLabel = false, onClick = () => {}, href='', target='_self' }) => {
    
    const iconSize = '2rem'
    const Element = href ? 'a' : 'button';
    
    return (
        <Element aria-label={ label } onClick={onClick} className={styles.button} { ...(target && { target: target }) } >
            { iconName && <Icon name={ iconName } width={ iconSize } height={ iconSize } /> }
            { showLabel ? label : '' }
        </Element>
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
