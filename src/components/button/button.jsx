import PropTypes from 'prop-types';

import { Icon } from '@components/icon/icon';
import styles from './button.module.scss';

export const Button = ({children, iconName = '', showLabel = false, onClick = () => {}, href='', target='_self' }) => {
    
    const iconSize = '2rem'
    const Element = href ? 'a' : 'button';
    
    return (
        <Element
            aria-label={ children }
            onClick={onClick}
            className={styles.button}
            { ...(href && { href: href })}
            { ...(target && { target: target }) } >
            { iconName && <Icon name={ iconName } width={ iconSize } height={ iconSize } /> }
            { showLabel ? children : '' }
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
}
