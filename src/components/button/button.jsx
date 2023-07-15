import { Icon } from '@components/icon/icon';
import styles from './button.module.scss';

export const Button = ({ iconName = '', label = '', showLabel = false, onClick = () => {}, href='', target='_self' }) => {
    
    const iconSize = '1.75rem'
    
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
