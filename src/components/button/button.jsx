import PropTypes from 'prop-types';

import { Icon } from '@components/icon/icon';
import styles from './button.module.scss';

export const Button = ({children, iconName = '', showLabel = false, onClick = () => {}, href='', target='_blank', iconPosition='left' }) => {
    
    const iconSize = '2rem'
    const Element = href ? 'a' : 'button';
    const iconProps = {name:iconName, width:iconSize, height:iconSize}
    
    return (
        <Element
            aria-label={ children }
            onClick={onClick}
            className={styles.button}
            { ...(href && { href: href })}
            { ...(target && { target: target }) } >
            { iconName && iconPosition == 'left' && <Icon {...iconProps}/> }
            { showLabel ? children : '' }
            { iconName && iconPosition == 'right' && <Icon {...iconProps}/> }
        </Element>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    iconName: PropTypes.string,
    showLabel: PropTypes.bool,
    onClick: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
    iconPosition: PropTypes.string,
}
